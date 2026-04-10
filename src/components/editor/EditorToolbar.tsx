'use client'
import type { Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Link,
  ImageIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react'
import { useState } from 'react'

interface EditorToolbarProps {
  editor: Editor
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
    }
    setShowLinkInput(false)
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
    }
    setShowImageInput(false)
  }

  const ToolButton = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void
    active?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-md transition-colors ${
        active
          ? 'bg-primary text-on-primary'
          : 'text-on-surface-variant hover:bg-surface-container-high'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="border-b border-outline-variant/20 p-2 flex flex-wrap gap-1 bg-surface-container-low">
      {/* Undo/Redo */}
      <ToolButton onClick={() => editor.chain().focus().undo().run()} title="تراجع">
        <Undo size={16} />
      </ToolButton>
      <ToolButton onClick={() => editor.chain().focus().redo().run()} title="إعادة">
        <Redo size={16} />
      </ToolButton>

      <span className="w-px h-6 bg-outline-variant/30 mx-1 self-center" />

      {/* Headings */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
        title="عنوان 1"
      >
        <Heading1 size={16} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="عنوان 2"
      >
        <Heading2 size={16} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="عنوان 3"
      >
        <Heading3 size={16} />
      </ToolButton>

      <span className="w-px h-6 bg-outline-variant/30 mx-1 self-center" />

      {/* Formatting */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="غامق"
      >
        <Bold size={16} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="مائل"
      >
        <Italic size={16} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="اقتباس"
      >
        <Quote size={16} />
      </ToolButton>

      <span className="w-px h-6 bg-outline-variant/30 mx-1 self-center" />

      {/* Lists */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="قائمة نقطية"
      >
        <List size={16} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="قائمة مرقمة"
      >
        <ListOrdered size={16} />
      </ToolButton>

      <span className="w-px h-6 bg-outline-variant/30 mx-1 self-center" />

      {/* Link */}
      <div className="relative">
        <ToolButton
          onClick={() => setShowLinkInput(!showLinkInput)}
          active={editor.isActive('link')}
          title="رابط"
        >
          <Link size={16} />
        </ToolButton>
        {showLinkInput && (
          <div className="absolute top-full mt-1 start-0 z-10 flex gap-2 bg-surface-container-lowest shadow-lg rounded-lg p-2 border border-outline-variant/20">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              dir="ltr"
              className="text-sm border-none bg-transparent outline-none w-48 text-on-surface placeholder:text-outline-variant"
              onKeyDown={(e) => e.key === 'Enter' && addLink()}
              autoFocus
            />
            <button
              onClick={addLink}
              className="text-xs font-bold text-primary hover:text-primary-dim"
            >
              إضافة
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="relative">
        <ToolButton onClick={() => setShowImageInput(!showImageInput)} title="صورة">
          <ImageIcon size={16} />
        </ToolButton>
        {showImageInput && (
          <div className="absolute top-full mt-1 start-0 z-10 flex gap-2 bg-surface-container-lowest shadow-lg rounded-lg p-2 border border-outline-variant/20">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="رابط الصورة..."
              dir="ltr"
              className="text-sm border-none bg-transparent outline-none w-48 text-on-surface placeholder:text-outline-variant"
              onKeyDown={(e) => e.key === 'Enter' && addImage()}
              autoFocus
            />
            <button
              onClick={addImage}
              className="text-xs font-bold text-primary hover:text-primary-dim"
            >
              إضافة
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
