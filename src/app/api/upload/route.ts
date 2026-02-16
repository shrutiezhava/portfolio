import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export async function POST(request: Request) {
    // Check auth
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, message: 'File too large. Max 5MB allowed.' }, { status: 400 });
    }

    // Validate type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json({ success: false, message: `Invalid file type. Allowed: ${ALLOWED_FILE_TYPES.join(', ')}` }, { status: 400 });
    }

    // Upload to Supabase Storage
    const bucketName = 'uploads';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error } = await supabase
        .storage
        .from(bucketName)
        .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false
        });

    if (error) {
        console.error('Supabase upload error:', error);
        return NextResponse.json({ success: false, message: 'Upload failed', error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicUrl });
}
