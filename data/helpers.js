import _ from 'lodash'
import cheerio from 'cheerio'
import MarkdownIt from 'markdown-it'
import Book from '../lib/Book'
import Section from '../lib/Section'
import Page from '../lib/Page'
import Story from '../lib/Story'
import { DiscussionEmbed } from 'disqus-react'
import url from 'url'

export const mit = new MarkdownIt({
  typographer: false,
})

const markdownOptions = {
  linkify: true
}

const cheerioOptions = {
  withDomLvl1: true,
  normalizeWhitespace: false,
  xmlMode: true,
  decodeEntities: true,
}

export function storyFromMarkdown(text, opts = {}) {
  const options = Object.assign({
    uid: '',
    title: '',
    content: ''
    // description: '',
    // events: [],
    // notes: [],
  }, opts)
  const $ = cheerio.load(mit.render(text.trim(), markdownOptions).trim(), cheerioOptions)
  const nodes = $.root().children()
  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i]
    if (child.tagName === 'h3' && !options.title) {
      options.title = $(child).text()
    }
    // if (child.tagName === 'p' && !options.description) {
    //
    // }
    // if (child.tagName === 'ul' && !options.events.length) {
    //   const children = $(child).children()
    //   for (let j = 0; j < children.length; j++) {
    //     options.events.push()
    //   }
    // }
  }
  options.uid = toUid(options.title)
  options.content = $.xml()
  return new Story(options)
}

export function bookFromMarkdown(markdown, opts = {}) {
  return bookFromHtml(mit.render(markdown.trim(), markdownOptions).trim(), opts)
}

export function bookFromHtml(html, opts = {}) {
  const options = Object.assign({
    uid: '',
    title: '',
    content: '',
    sections: []
  }, opts)
  const $ = cheerio.load(html, cheerioOptions)
  const nodes = $.root().children()
  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i]
    switch (child.tagName) {
      case 'h1':
        options.title = $(child).text()
        break
      case 'h2':
        options.sections.push(cheerio.html($(child)))
        break
      default:
        if (options.sections.length) {
          options.sections[options.sections.length - 1] += '\n' + cheerio.html($(child))
        } else {
          options.content += '\n' + cheerio.html($(child))
        }
    }
  }
  options.uid = toUid(options.title)
  options.sections = options.sections.map(sectionFromObjectWithHtml)
  options.content = options.content.trim()
  return new Book(options)
}

export function sectionFromObjectWithHtml(html, opts = {}) {
  const options = Object.assign({
    uid: '',
    title: '',
    content: '',
    pages: []
  }, opts)
  const $ = cheerio.load(html, cheerioOptions)
  const nodes = $.root().children()
  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i]
    switch (child.tagName) {
      case 'h2':
        options.title = $(child).text()
        break
      case 'h3':
        options.pages.push(cheerio.html($(child)))
        break
      default:
        if (options.pages.length) {
          options.pages[options.pages.length - 1] += '\n' + cheerio.html($(child))
        } else {
          options.content += '\n' + cheerio.html($(child))
        }
    }
  }
  options.uid = toUid(options.title)
  options.pages = options.pages.map(pageFromObjectWithHtml)
  options.content = options.content.trim()
  return new Section(options)
}

export function pageFromObjectWithHtml(html, opts = {}) {
  const options = Object.assign({
    uid: '',
    title: '',
    content: '',
    points: []
  }, opts)
  const $ = cheerio.load(html, cheerioOptions)
  const nodes = $.root().children()
  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i]
    switch (child.tagName) {
      case 'h3':
        options.title = $(child).text()
        break
      case 'ul':
        if (!options.content) {
          options.points = $(child).children().map((index, el) => $(el).html()).toArray()
        } else {
          options.content += '\n' + cheerio.html($(child))
        }
        break
      default:
        options.content += '\n' + cheerio.html($(child))
    }
  }
  options.uid = toUid(options.title)
  options.content = options.content.trim()
  return new Page(options)
}

// export function bookFromMarkdownFile(filename, opts = {}) {
//   return bookFromMarkdown(fs.readFileSync(filename), opts)
// }

export function normalizeHTML(html) {
  return cheerio.load(html, cheerioOptions).xml().replace(/^\s+/gm, '').trim()
}

export function normalizeMarkdown(markdown) {
  markdown
}

export function toUid(string) {
  return _.kebabCase(string)
}

export function withUid(object) {
  return Object.assign(object, { uid: toUid(object.title) })
}

export function story(title, events) {
  return new Story({
    actor: title[0],
    plot: title[1],
    events: events
  })
}

export function disqusConfig(config) {
  config.title = _.truncate(config.title, {
    length: 200,
    separator: /,? +/,
  })
  return {
    shortname: 'storytailor',
    config: _.defaults(config, {
      // identifier is equal to url to allow pages with the same name within different projects (e.g. 'User signs up')
      url: `${config.baseUrl}${config.identifier}`
    })
  }
}

export const isServer = typeof window === 'undefined'

export const isClient = typeof window !== 'undefined'

export const isDev = process.env.NODE_ENV === 'development'

export const isProd = process.env.NODE_ENV === 'production'

export function getBaseUrl(req) {
  if (isClient) {
    const { protocol, host } = url.parse(window.location.href)
    return `${protocol}//${host}`
  } else {
    const protocol = isDev ? 'http:' : 'https:'
    const host = req.headers.host
    return `${protocol}//${host}`
  }
}
