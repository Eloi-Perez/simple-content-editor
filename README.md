This is a [Next.js](https://nextjs.org/) project where the admin can edit the content of the pages directly in the browser using [Editor.js](https://editorjs.io/)

## Getting Started

First, you need to create some files not included this repository.

* In root folder create '.env.local' with the entries:

  DB_USER=your_user

  DB_PASS=your_password
  
  IRON_SECRET=32_characters_long_private_key_to_encrypt_cookies
  

* Also in root, create 'data' folder with a .json file for each of the editables pages included (atm it will be about.json and index.json)
The content of this filse should be in a readable format by editor.js, this is an example you can use to bootstrap your aplication:

  `{
    "time": 1637196257931,
    "blocks": [
        {
            "id": "KOigsjrDCs",
            "type": "header",
            "data": {
                "text": "Welcome",
                "level": 2
            }
        }
    ],
    "version": "2.22.2"
}`


Now you can run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
