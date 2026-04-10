'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { EditorToolbar } from './EditorToolbar'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          dir: 'auto',
        },
      }),
      Placeholder.configure({
        placeholder: 'ابدأ الكتابة هنا...',
      }),
      CharacterCount,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        dir: 'rtl',
        lang: 'ar',
        class: 'tiptap focus:outline-none min-h-[500px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const wordCount = editor.storage.characterCount?.words() ?? 0
  const charCount = editor.storage.characterCount?.characters() ?? 0

  return (
    <div className="border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-lowest">
      <EditorToolbar editor={editor} />
      <div className="p-6">
        <EditorContent editor={editor} />
      </div>
      <div className="border-t border-outline-variant/10 px-6 py-2 flex justify-end gap-4">
        <span className="text-[10px] text-outline">{wordCount} كلمة</span>
        <span className="text-[10px] text-outline">{charCount} حرف</span>
      </div>
    </div>
  )
}
