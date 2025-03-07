# Lazy Resume Theme for `jsonresume` Format

## QuickStart

```bash
git clone git@github.com:tudorjnu/jsonresume-theme-lazy.git
cd jsonresume-theme-lazy
npm i
```

## Make a CV

The theme comes with a `resume.json` and a `cover.md` inside it. Now, you can
simply create a resume with the following command:

```bash
npm run export-resume ./resume.json resume.pdf
```

The expected arguments are:

```bash
npm run export-resume <path-to-resume.json> [output-path]
```

## Make a Cover Letter

Similarly, to export a cover letter, use:

```bash
npm run export-cover render_cover.js ./resume.json ./cover.md cover.pdf
```

The expected arguments are:

```bash
npm run export-cover render_cover.js <path-to-resume.json> <path-to-cover.md> [output-path] 
```

If you like the resume theme and style please leave a star! If you want to
contribute, contributions are welcomed.

## TODO's

- [ ] Make a cli to be able to make resumes on the fly
- [ ] Integrate it better with `resume-cli` and `resumed`
- [ ] Make sure the styles are consistent (there are a lot of issues with the sizing)
- [ ] Fix the pdf exports
