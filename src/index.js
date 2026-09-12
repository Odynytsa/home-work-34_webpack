import Post from './post.ts'
import join from 'lodash/join.js'
import './styles.css'
import './styles/theme.scss'
import './styles/badges.less'
import logoUrl from './assets/logo.svg'

console.log('Webpack works!')

const post = new Post('Webpack Post Title')

console.log('Post to string:', post.toString())

const logo = document.createElement('img')
logo.src = logoUrl
logo.alt = 'Webpack logo'
logo.className = 'logo'
document.querySelector('.container').prepend(logo)

const subtitle = document.createElement('p')
subtitle.className = 'subtitle'
subtitle.textContent = join(['Bundled', 'with', 'Webpack', '5'], ' ')
document.querySelector('.container').append(subtitle)
