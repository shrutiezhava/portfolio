
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

    // Upload to Supabase Storage
    const bucketName = 'uploads';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
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
