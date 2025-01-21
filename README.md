# Find a Friend - API with SOLID concepts

![banner]()

## Summary

- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Objectives](#objectives)
- [Routes](#routes)
- [Project](#project)
- [How to execute the project](#how-to-execute-the-project)
- [Author](#author)

## Dependencies

- [Fastify](https://fastify.dev/): Fast and low overhead web framework, for Node.js.

## Dev Dependencies

- [ESLint](https://eslint.org/): Code analysis tool responsible for identifying errors and inconsistencies.

- [Prettier](https://prettier.io/): Code formatting tool that ensures code style consistency.

- [Typescript](https://www.typescriptlang.org/): A strong typed programming language that builds on JavaScript

- [Tsx](https://www.npmjs.com/package/tsx): TypeScript Execute (tsx) is the easiest way to run TypeScript in Node.js, because Node.js was created with JavaScript.

## Objectives

- Application Rules:

  - [x] It should be able to register a pet
  - [] It should be able to list all able pets to be adopted in a city
  - [] It should be able to filter pets by its characteristics
  - [x] It should be able to visualize a pet details to the adoption
  - [x] It should be able to register yourself as an ORG (Organization)
  - [x] It should be able to login/be authenticated as an ORG

- Business Rules:
  - [] To list the pets, is required to inform the city
  - [x] It's required to an ORG to have an address and a WhatsApp number
  - [x] A pet must be linked to an ORG
  - [] The user that want to adopt will contact the ORG by WhatsApp
  - [] All the filters, except the city, are optionals
  - [] For an ORG to access the application as an Admin, it must be logged.

## Routes

### Organization

- Register a new ORG: `/organization`

  - Method: `POST`
  - Body:
    - Organization Name: string
    - Owner: string
    - Email: string
    - Address: string
    - CEP: number
    - WhatsApp: number (11 characters)
    - Password: string (Between 6 to 15 characters)
    - Confirm Password: string (Between 6 to 15 characters)
  - Status Code: `201`

---

- Login/Authentication: `/login`

  - Method: `POST`
  - Body:
    - Email: string,
    - Password: string (Between 6 to 15 characters)
  - Status Code: `200`
  - Data Returned:

```typescript
interface IAuthentication {
  token: string;
}
```

---

- Refresh Token: `/token/refresh`

  - Method: `GET`
  - Status Code: `200`

---

- Organization Profile: `/organization/profile`

  - **Safe route:** Authentication required
  - Method: `GET`
  - Status Code: `200`
  - Data Returned:

```typescript
interface IOrganizationProfile {
  id: string;
  created_at: string;
  email: string;
  cep: string;
  owner: string;
  organizationName: string;
  address: string;
  whatsApp: number;
}
```

---

- Organization Summary: `/organization/summary`

  - Method: `GET`
  - Status Code: `200`
  - Data Returned:

```typescript
interface IOrganizationProfile {
  id: string;
  organizationName: string;
  address: string;
  whatsApp: number;
  cep: string;
}
```

---

### Pet

- Register a new pet: `/pet`

  - **Safe route:** Authentication required
  - Method: `POST`
  - Body:
    - Name: string
    - Description: string (optional)
    - Specie: Cat | Dog | Bird | Other
    - Age: Puppy | Adult | Senior
    - Size: Small | Medium | Large
    - Energy Level: number (between 1 and 5)
    - Independency Level: number (between 1 and 3)
    - Space Requirements: number (between 1 and 3)
    - Photos: string []
    - Adoption Requirements: string []
    - Organization Id: string
  - Status Code: `201`

---

- Pet Profile: `/pet/:petId/profile`
  - Method: `GET`
  - Status Code: `200`
  - Data Returned:

```typescript
interface IPetProfile {
  id: string;
  name: string;
  description?: string;
  specie: "Cat" | "Dog" | "Bird" | "Other";
  age: "Puppy" | "Adult" | "Elderly";
  size: "Small" | "Medium" | "Large";
  energyLevel: number; // between 1 and 5
  independencyLevel: number; // between 1 and 3
  spaceRequirements: number; // between 1 and 3
  photos: string[];
  adoptionRequirements: string[];
  organizationId: string;
}
```

---

- Search Pets by City: `/pet/search`

  - Method: `GET`
  - Query:
    - City: string
    - State: string
    - Page: (min 1 - 20 pets per page)
    - Filter?: Age | Specie | Energy Level | Independency Level | Space Requirements
  - Status Code: `200`
  - Data Returned:

```typescript
interface IPets {
  Pets: {
    id: string;
    name: string;
    specie: "Cat" | "Dog" | "Bird" | "Other";
    photo: string;
  }[];
}
```

---

- Remove a Pet: `/pet`

  - Method: `DELETE`
  - Params:
    - Pet Id: string
  - Status Code: `204`

---

- Chance pet detail: `/pet`

  - **Safe route:** Authentication required
  - Method: `Patch`
  - Bearer token:
    - Organization Id
  - Status Code: 200
  - Body:
    

## Project

## How to execute the project

## Author

- GitHub - [Felipe Santiago Morais](https://github.com/SantiagoMorais)
- Linkedin - [Felipe Santiago](https://www.linkedin.com/in/felipe-santiago-873025288/)
- Instagram - [@felipe.santiago.morais](https://www.instagram.com/felipe.santiago.morais)
- Email - <a href="mailto:contatofelipesantiago@gmail.com" target="blank">contatofelipesantiago@gmail.com</a>
- <a href="https://api.whatsapp.com/send?phone=5531996951033&text=Hi%2C%20Felipe%21%20I%20got%20your%20contact%20from%20your%20github.">Whatsapp</a>
