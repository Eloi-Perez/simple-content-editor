This is a [Next.js](https://nextjs.org/) project where the admin can edit the content of the pages directly in the browser using [Editor.js](https://editorjs.io/)

This project uses Static Generation so the HTML is generated at build time and will be reused on each request.
Also, it will be regenerated with each change of the content.

In addition, it uses Server-side Rendering for the edit pages so the HTML is generated on each request as an admin.



## Getting Started

First, you need to create some files not included in this repository.

* In the root folder, create '.env.local' with the entries:

  DB_USER=admin_user

  DB_PASS=admin_password
  
  IRON_SECRET=32_characters_long_private_key_to_encrypt_cookies
  

* Also in root, create 'data' folder with a .json file for each of the editable pages included (atm it will be about.json and index.json)
The content of these files should be in a readable format by editor.js, this is an example you can use to bootstrap your application:

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
