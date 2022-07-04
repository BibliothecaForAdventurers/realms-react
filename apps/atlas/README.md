# The Atlas Repo

<p align="left">
  <a aria-label="Build" href="https://github.com/BibliothecaForAdventurers/realms-react/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/workflow/status/BibliothecaForAdventurers/realms-react/CI-atlas-app/main?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
</p>

> Part of the [Bibliotheca DAO](https://github.com/BibliothecaForAdventurers)

## Develop

```bash
$ cd apps/atlas
$ yarn dev
# Alternatively: yarn workspace webapp run dev -p 3000
```

To test Lore Module you will need to:

1. Generate an Arweave wallet and download the private key, and add a containing `arweaveKey` to the json so the format is like:

```{
  "arweaveKey": {
    "kty": "RSA",
    "n": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "e": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "d": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "p": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "q": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "dp": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "dq": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "qi": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

2. Encrypt the file using aes-256-cbc - you can use [DevGlan](https://www.devglan.com/online-tools/aes-encryption-decryption) - using a 32 character secret key and a 16 character IV
3. Replace the AES Encrypted Output in [Secrets File](./apps/atlas/secrets.json.enc), and add the secret key and IV used to .env file

### Features

> Some common features that have been enabled to widen monorepo testing scenarios.

- [x] Styling: [Emotion v11](https://emotion.sh/) support with critical path extraction enabled.
- [x] Styling: [Tailwind v3](https://tailwindcss.com/) with JIT mode enabled and common plugins.
- [x] Tests: [jest](https://jestjs.io/) + [ts-jest](https://github.com/kulshekhar/ts-jest) + [@testing-library/react](https://testing-library.com/)
- [x] E2E: [Playwright](https://playwright.dev/)
