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
    categories: [
      {
        id: 1,
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661"
      },
      {
        id: 2,
        name: "Fashion",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050"
      },
      {
        id: 3,
        name: "Home",
        image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a"
      },
      {
        id: 4,
        name: "Sports",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
      }
    ],
    featuredProducts: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        discount: 20,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "Electronics"
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        discount: 15,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
        category: "Electronics"
      },
      {
        id: 3,
        name: "Running Shoes",
        price: 79.99,
        discount: 10,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Sports"
      },
      {
        id: 4,
        name: "Leather Bag",
        price: 149.99,
        discount: 25,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
        category: "Fashion"
      }
    ]
  }; 