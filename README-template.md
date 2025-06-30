# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

This a screenshot of my solution.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Github repo](https://github.com/Abdul-luh/product-list-with-cart-main)
- Live Site URL: [demo site](https://product-list-with-cart-main-indol.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [vite](https://nextjs.org/) - React framework
- [typescript](https://nextjs.org/) - React framework
- [tailwindcss](https://tailwindcss.com/) - React framework
- [framer-motion](https://nextjs.org/) - React framework
- [lucid-react](https://nextjs.org/) - React framework
- [Shadcn Components](https://ui.shadcn.com/) - For styles
- [vercel](https://vercel.com/) - For deployment

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

I tried learning useReducer but this project made me get a hang of it and it is what I used to handle all my cart items

To see how you can add code snippets, see below:

```tsx
// created the state
const [cartItems, setCartItems] = useState<Record<string, number>>({});
```

```tsx
// Calculate total items in cart
const totalItems = Object.values(cartItems).reduce(
  (sum, quantity) => sum + quantity,
  0
);
```

and handled most things from that knowledge

```tsx
// components/OrderTotal.tsx
type OrderTotalProps = {
  cartItems: Record<string, number>;
  desserts: { name: string; price: number }[];
};

export default function OrderTotal({ cartItems, desserts }: OrderTotalProps) {
  const total = Object.entries(cartItems).reduce((sum, [name, quantity]) => {
    const dessert = desserts.find((d) => d.name === name);
    return dessert ? sum + dessert.price * quantity : sum;
  }, 0);

  return (
    <div className="flex justify-between items-center mt-4 pt-4">
      <span className="font-semibold text-lg text-rose-900">Order Total</span>
      <span className="font-bold text-lg text-rose-900">
        ${total.toFixed(2)}
      </span>
    </div>
  );
}
```

created font variable from the available font in the starter file

```css
font-face {
  font-family: "RedHatText";
  src: url("/fonts/static/RedHatText-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "RedHatText";
  src: url("/fonts/static/RedHatText-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}
/* ... */
```

used the tailwinds latest method of setting up variables

```css
@theme {
  /* Custom font */
  --font-redhat: "RedHatText", sans-serif;

  /* Custom Solid Colors */
  --color-red: hsl(14, 86%, 42%);
  --color-green: hsl(159, 69%, 38%);

  /* Rose Scale */
  --color-rose-50: hsl(20, 50%, 98%);
  --color-rose-100: hsl(13, 31%, 94%);
  --color-rose-300: hsl(14, 25%, 72%);
  --color-rose-400: hsl(7, 20%, 60%);
  --color-rose-500: hsl(12, 20%, 44%);
  --color-rose-900: hsl(14, 65%, 9%);
}
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

I would like to build more UI's with animation, working with actual backend a sending and retrieving data from backend, building realtime data applications and online payment application, but most of all, know how the professional work really is and make something that solves problems

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [chatgpt](https://chatgpt.com/) - This helped me explain some concepts I never really understood. I really liked this pattern and will use it going forward.
- [DeepSeek AI](https://chat.deepseek.com/) - This is an amazing AI tool which helped me finally understand useRducer and compartmentalization of components. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Frontend Mentor - [@abdul-luh](https://www.frontendmentor.io/profile/abdul-luh)
- Twitter - [@abdullah_odulate](https://www.twitter.com/@_abdullah_odulate)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
