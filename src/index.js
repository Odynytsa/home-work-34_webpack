import Post from './post.js'
import './styles.css'
import logoUrl from './assets/logo.svg'

console.log('Webpack works!')

const post = new Post('Webpack Post Title')

console.log('Post to string:', post.toString())

const logo = document.createElement('img')
logo.src = logoUrl
logo.alt = 'Webpack logo'
logo.className = 'logo'
document.querySelector('.container').prepend(logo)
