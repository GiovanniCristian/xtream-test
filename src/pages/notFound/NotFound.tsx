import Lottie from 'lottie-react'
import NoFound from '../../assets/json/notFound.json'
import { ReactTyped } from 'react-typed'
import './notFound.css'

const NotFound = () => {
    const phrases = [
        "Oops..",
        "It seems like you're lost",
        "Don't Worry",
        "Just look at the sidebar on the left"
    ]

    return (
        <div className='not-found'>
            <div className='left-side'>
                <Lottie animationData={NoFound} style={{ width: '65%' }} />
            </div>
            <div className='right-side'>
                <ReactTyped
                    strings={phrases}
                    typeSpeed={80}
                    backSpeed={40}
                    loop
                    className='not-typed'
                />
                <p style={{fontSize: '3.5rem'}}>&#128072; &#128072; &#128072;</p>
            </div>
        </div>
    )
}

export default NotFound