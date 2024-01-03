import { useState } from "react";
import ReactQuill from "react-quill";
import {Navigate} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import Editor from "../Editor";

export default function CreatePost() {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [category, setCategory] = useState('');
    const[redirect,setRedirect]=useState(false);
    async function createNewPost(ev) {
        const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('file', files[0]);
    data.append('category', category); 
        ev.preventDefault();
        const response= await fetch('https://link-start-pop-culture-site.herokuapp.com/post',{
            method:'POST',
            body:data,
            credentials:'include',
        });
        if(response.ok){
            setRedirect(true)
        }
    }
    if(redirect){
       return <Navigate to={'/'}/>
    }
return(
    <div className="Create-Post">
    <form onSubmit={createNewPost}>
        <input type="title"
         placeholder={'Title'} 
         value={title} 
         onChange={ev=>setTitle(ev.target.value)}/>
        <input type="summary" 
        placeholder={'Summary'}
        value={summary}
        onChange={ev=>setSummary(ev.target.value)}/>
       <input
    type="file"
    onChange={ev => setFiles(ev.target.files)} 
/>
       <Editor value={content} onChange={setContent}/>

       <label>Select Category:</label>
            <select
                value={category}
                onChange={ev => setCategory(ev.target.value)}
            >
                <option value="">Select Category</option>
                <option value="gaming">Gaming</option>
                <option value="technology">Technology</option>
                <option value="shows">TV Shows</option>
                <option value="movies">Movies</option>
            </select>
        <button style={{marginTop:'5px'}}>Create post</button>
    </form>
    </div>
);

}
