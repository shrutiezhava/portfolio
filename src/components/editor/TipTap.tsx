'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Image as ImageIcon, Heading1, Heading2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCallback } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
    const addImage = useCallback(() => {
        const url = window.prompt('URL');

        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-border bg-alt-section/50 p-2 flex flex-wrap gap-2 sticky top-0 z-10 backdrop-blur-md">
            <Button
                type="button"
                size="sm"
                variant={editor.isActive('bold') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="p-2"
            >
                <Bold className="w-4 h-4" />
            </Button>
            <Button
                type="button"
                size="sm"
                variant={editor.isActive('italic') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="p-2"
            >
                <Italic className="w-4 h-4" />
            </Button>
            <Button
                type="button"
                size="sm"
                variant={editor.isActive('heading', { level: 1 }) ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className="p-2"
            >
                <Heading1 className="w-4 h-4" />
            </Button>
            <Button
                type="button"
                size="sm"
                variant={editor.isActive('heading', { level: 2 }) ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className="p-2"
            >
                <Heading2 className="w-4 h-4" />
            </Button>
            <Button
                type="button"
                size="sm"
                variant={editor.isActive('bulletList') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="p-2"
            >
                <List className="w-4 h-4" />
            </Button>
            <Button
                type="button"
                size="sm"
                variant={editor.isActive('orderedList') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className="p-2"
            >
                <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
                type="button"
                size="sm"
                variant={editor.isActive('blockquote') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className="p-2"
            >
                <Quote className="w-4 h-4" />
            </Button>
            <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={addImage}
                className="p-2"
            >
                <ImageIcon className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default function TipTap({
    content = '',
    onChange,
}: {
    content?: string;
    onChange: (html: string) => void;
}) {
    const editor = useEditor({
        extensions: [StarterKit, ImageExtension],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg prose-slate focus:outline-none max-w-none min-h-[300px] p-4',
            },
        },
        immediatelyRender: false // Fixes SSR hydration mismatch potentially
    });

    return (
        <div className="border border-border rounded-lg overflow-hidden bg-background">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
