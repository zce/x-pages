# x-pages-example

> A static site built by [zce/x-pages](https://github.com/zce/x-pages)

## Structure

```
└── my-project ·········································· proj root
    ├── assets ·········································· static assets
    │   ├── css ········································· styles (auto compile scss)
    │   │   ├── _variables.scss ························· partials scss (dont output)
    │   │   └── style.scss ······························ entry scss
    │   ├── img ········································· images (auto minify)
    │   │   └── rock.png ································ image file
    │   └── js ·········································· scripts (auto compile es2015)
    │       └── global.js ······························· script file
    ├── layouts ········································· layouts (dont output)
    │   └── basic.html ·································· layout file
    ├── partials ········································ partials (dont output)
    │   ├── footer.html ································· partial file
    │   └── header.html ································· partial file
    ├── config.js ······································· config file
    ├── favicon.ico ····································· site favicon
    └── index.html ······································ page file (use layout & partials)
```

## Usage

```sh
# dev hot reload serve
$ x-pages serve

# development build
$ x-pages build

# production build
$ x-pages build --production

# deploy to gh pages
$ x-pages deploy --production
```

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)
