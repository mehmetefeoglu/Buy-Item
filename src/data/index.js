// Header Data
export const headerData = {
  topBar: {
    contact: {
      phone: "(225) 555-0118",
      email: "michelle.rivera@example.com"
    },
    promoText: "Follow Us and get a chance to win 80% off",
    socialLinks: [
      { id: 1, icon: 'Instagram', url: '#' },
      { id: 2, icon: 'Youtube', url: '#' },
      { id: 3, icon: 'Facebook', url: '#' },
      { id: 4, icon: 'Twitter', url: '#' }
    ]
  },
  navigation: {
    logo: "Buy-Item",
    mainLinks: [
      { id: 1, text: "Home", path: "/" },
      { id: 2, text: "About", path: "/about" },
      { id: 3, text: "Blog", path: "/blog" },
      { id: 4, text: "Contact", path: "/contact" },
      { id: 5, text: "Pages", path: "/pages" }
    ],
    shopCategories: {
      women: ['Bags', 'Belts', 'Cosmetics', 'Hats'],
      men: ['Bags', 'Belts', 'Cosmetics', 'Hats']
    }
  }
};

// Footer Data
export const footerData = {
  logo: "Buy-Item",
  socialLinks: [
    { id: 1, icon: 'Facebook', url: '#' },
    { id: 2, icon: 'Instagram', url: '#' },
    { id: 3, icon: 'Twitter', url: '#' }
  ],
  footerLinks: {
    'Company Info': ['About Us', 'Carrier', 'We are hiring', 'Blog'],
    'Legal': ['About Us', 'Carrier', 'We are hiring', 'Blog'],
    'Features': ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'],
    'Resources': ['IOS & Android', 'Watch a Demo', 'Customers', 'API']
  },
  copyright: "Made With Love By Finland All Right Reserved"
};

// Home Page Data (includes slider data)
export const homeData = {
  slider: {
    slides: [
      {
        id: 1,
        title: "Special Offer",
        subtitle: "Save 20% on your first order",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        buttonText: "Shop Now",
        buttonLink: "/shop",
        imageLarge: "https://picsum.photos/1920/1080",
        imageSmall: "https://picsum.photos/640/360"
      },
      {
        id: 2,
        title: "New Collection",
        subtitle: "Spring/Summer 2024",
        description: "Discover our latest arrivals and trending styles.",
        buttonText: "Explore Now",
        buttonLink: "/new-collection",
        imageLarge: "https://picsum.photos/1920/1080?random=2",
        imageSmall: "https://picsum.photos/640/360?random=2"
      }
    ]
  },
  editorsPick: {
    title: "EDITOR'S PICK",
    categories: [
      {
        id: 1,
        name: "MEN",
        image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        link: "/category/men"
      },
      {
        id: 2,
        name: "WOMEN",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        link: "/category/women"
      },
      {
        id: 3,
        name: "ACCESSORIES",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
        link: "/category/accessories"
      },
      {
        id: 4,
        name: "KIDS",
        image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        link: "/category/kid"
      }
    ]
  },
  products: {
    title: "Featured Products",
    items: [
      {
        id: 1,
        name: "Graphic Design",
        category: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
        colors: ["blue", "green", "orange", "purple"]
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
        category: "Graphic Design",
        department: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        colors: [
          { id: 1, color: "#23A6F0" },
          { id: 2, color: "#23856D" },
          { id: 3, color: "#8B5C41" },
          { id: 4, color: "#252B42" }
        ]
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
        category: "Graphic Design",
        department: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        colors: [
          { id: 1, color: "#23A6F0" },
          { id: 2, color: "#23856D" },
          { id: 3, color: "#8B5C41" },
          { id: 4, color: "#252B42" }
        ]
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        category: "Graphic Design",
        department: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        colors: [
          { id: 1, color: "#23A6F0" },
          { id: 2, color: "#23856D" },
          { id: 3, color: "#8B5C41" },
          { id: 4, color: "#252B42" }
        ]
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c",
        category: "Graphic Design",
        department: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        colors: [
          { id: 1, color: "#23A6F0" },
          { id: 2, color: "#23856D" },
          { id: 3, color: "#8B5C41" },
          { id: 4, color: "#252B42" }
        ]
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1524758870432-af57e54afa26",
        category: "Graphic Design",
        department: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        colors: [
          { id: 1, color: "#23A6F0" },
          { id: 2, color: "#23856D" },
          { id: 3, color: "#8B5C41" },
          { id: 4, color: "#252B42" }
        ]
      },
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        category: "Graphic Design",
        department: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        colors: [
          { id: 1, color: "#23A6F0" },
          { id: 2, color: "#23856D" },
          { id: 3, color: "#8B5C41" },
          { id: 4, color: "#252B42" }
        ]
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c",
        category: "Graphic Design",
        department: "English Department",
        price: 16.48,
        discountedPrice: 6.48,
        colors: [
          { id: 1, color: "#23A6F0" },
          { id: 2, color: "#23856D" },
          { id: 3, color: "#8B5C41" },
          { id: 4, color: "#252B42" }
        ]
      }
    ]
  },
  carousel: {
    slides: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
        smallTitle: "SUMMER 2020",
        title: "Vita Classic Product",
        description: "We know how large objects will act, but things on a small scale",
        price: 16.48,
        buttonText: "ADD TO CART"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
        smallTitle: "SUMMER 2020",
        title: "Vita Classic Product",
        description: "We know how large objects will act, but things on a small scale",
        price: 16.48,
        buttonText: "ADD TO CART"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
        smallTitle: "SUMMER 2020",
        title: "Vita Classic Product",
        description: "We know how large objects will act, but things on a small scale",
        price: 16.48,
        buttonText: "ADD TO CART"
      }
    ]
  },
  neuralSection: {
    smallTitle: "SUMMER 2020",
    title: "Part of the Neural Universe",
    description: "We know how large objects will act, but things on a small scale.",
    buttons: {
      primary: {
        text: "BUY NOW",
        link: "/buy"
      },
      secondary: {
        text: "LEARN MORE",
        link: "/learn"
      }
    },
    image: "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80"
  },
  featuredArticles: {
    subtitle: "Practice Advice",
    title: "Featured Posts",
    articles: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        isNew: true,
        categories: ["Google", "Trending", "New"],
        title: "Loudest à la Madison #1 (L'integral)",
        description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "22 April 2021",
        comments: 10
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        isNew: true,
        categories: ["Google", "Trending", "New"],
        title: "Loudest à la Madison #1 (L'integral)",
        description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "22 April 2021",
        comments: 10
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        isNew: true,
        categories: ["Google", "Trending", "New"],
        title: "Loudest à la Madison #1 (L'integral)",
        description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "22 April 2021",
        comments: 10
      }
    ]
  }
};

export const shopData = {
  categories: [
    {
      id: 1,
      name: "CLOTHS",
      itemCount: 5,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050"
    },
    {
      id: 2,
      name: "CLOTHS",
      itemCount: 5,
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93"
    },
    {
      id: 3,
      name: "CLOTHS",
      itemCount: 5,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
    },
    {
      id: 4,
      name: "CLOTHS",
      itemCount: 5,
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908"
    },
    {
      id: 5,
      name: "CLOTHS",
      itemCount: 5,
      image: "https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe"
    }
  ],
  products: [
    {
      id: 1,
      name: "Floating Phone",
      category: "English Department",
      price: 16.48,
      discountedPrice: 6.48,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
      colors: ["blue", "green", "orange", "purple"],
      description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
      reviews: 10,
      availability: "In Stock"
    },
    {
      id: 2,
      name: "Graphic Design",
      category: "English Department",
      price: 16.48,
      discountedPrice: 6.48,
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7",
      colors: ["blue", "green", "orange", "purple"]
    },
    {
      id: 3,
      name: "Graphic Design",
      category: "English Department",
      price: 16.48,
      discountedPrice: 6.48,
      image: "https://images.unsplash.com/photo-1467043198406-dc953a3defa0",
      colors: ["blue", "green", "orange", "purple"]
    },
    {
      id: 4,
      name: "Graphic Design",
      category: "English Department",
      price: 16.48,
      discountedPrice: 6.48,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      colors: ["blue", "green", "orange", "purple"]
    }
  ],
  brands: [
    {
      id: 1,
      name: "Hooli",
      logo: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/brands/hooli.svg",
      url: "http://www.hbo.com/silicon-valley"
    },
    {
      id: 2,
      name: "Lyft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/2000px-Lyft_logo.svg.png",
      url: "https://lyft.com"
    },
    {
      id: 3,
      name: "Pied Piper",
      logo: "https://icons.iconarchive.com/icons/fa-team/fontawesome-brands/512/FontAwesome-Brands-Pied-Piper-Hat-icon.png",
      url: "https://piedpiperhub.netlify.app"
    },
    {
      id: 4,
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
      url: "https://stripe.com"
    },
    {
      id: 5,
      name: "AWS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png",
      url: "https://aws.amazon.com"
    },
    {
      id: 6,
      name: "Reddit",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Reddit_logo.svg/2560px-Reddit_logo.svg.png",
      url: "https://reddit.com"
    }
  ]
}; 