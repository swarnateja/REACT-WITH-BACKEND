import TopBar from '../TopBar/TopBar'
import './Write.css'

export default function Write() {
  return (
    <>
    <TopBar />
    <div className='write'>
    <img className='writeImg' src="https://res.cloudinary.com/amst/image/upload/v1647343311/pexels-life-of-pix-7919_vh0lhl.jpg" alt="coverpic" />
    <form className='writeForm'>
    <div className='writeFormGroup'>
    <label htmlFor='fileInput'>
    <i className="writeIcon fa-solid fa-image"></i>
    </label>
    <input type='file' id='fileInput' style={{display:"none"}}/>
    <input type='text' id='' autoFocus="true" className='writeInput' placeholder='Title'/>
    </div>
    <div className='writeFormGroup'>
        <textarea className='writeInput writeText' placeholder='Tell your story...' type="text"></textarea> 
    </div>
    <button className='writeSubmit'>Publish</button>
    </form>
    </div>
    </>

  )
}
