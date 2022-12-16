
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor, } from '@tiptap/react'
import React, { useCallback } from 'react'
import StarterKit from '@tiptap/starter-kit'




const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            粗體
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            斜體
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            刪除線
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            h1
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            h6
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            圓點清單
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            數字清單
          </button>

          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            分隔線
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>
            斷行
          </button>





        </div>
      </div>
    </>
  )
}

export default (props) => {
  //   let [data,setdata]= useState()
  //   let [data1,setdata1]= useState()
  //   let id = useParams()
  //   const asyncfn = async ()=>{
  //   let result = await axios.get(`http://localhost:8000/edit/${id.articleId}`)
  //      setdata(result.data)

  //   }
  //   useEffect(()=>{
  //     asyncfn()
  // },[])
  
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      StarterKit,
    ], content: "    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>"

  })
  const addImage = useCallback(() => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }
  return (

    <div className='Tiptap container'>
      <div className=''>
        <button onClick={addImage} className='col'>上傳圖片</button>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className='edit col-12' type='text' />

      </div>
    </div>
  )
}