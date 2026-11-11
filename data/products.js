/* =========================================================================
   Alpine Home Concept · PRODUCT DATA
   -------------------------------------------------------------------------
   This file is the single source of truth for every product on the site.
   To add a product: copy one block in AHC_PRODUCTS, change the values,
   put its photos in img/products/<id>/ as 1-800.webp, 1-1600.webp, 2-800.webp ...

   Fields
   - id          unique, lowercase, used in the URL: product.html?id=<id>
   - name        display name (same in all languages)
   - category    sculptural | coffee-nesting | side | dining | mirrors | accessories
   - featured    true = shown on the home page
   - description short text in en / de / fr / tr
   - material    key of a material text in assets/js/i18n.js (material.*)
   - colors      keys of AHC_COLORS below
   - variants    sizes / sets. price is in CHF; null = "price on request"
   - images      paths without the size suffix (-800.webp / -1600.webp added by the site)
   - etsy        Etsy listing URL or null
   - leadTime    stock (ships in 1-5 working days) | onRequest
   PRICES ARE DRAFTS converted from Etsy GBP prices (x1.10). Cihan sets final CHF prices.
   ========================================================================= */
window.AHC_COLORS = {
  "walnut": {
    "swatch": "#5b3a26",
    "label": {
      "en": "Walnut",
      "de": "Nussbaum",
      "fr": "Noyer",
      "tr": "Ceviz"
    }
  },
  "black": {
    "swatch": "#1f1f1f",
    "label": {
      "en": "Black",
      "de": "Schwarz",
      "fr": "Noir",
      "tr": "Siyah"
    }
  },
  "white": {
    "swatch": "#f2f0ec",
    "label": {
      "en": "White",
      "de": "Weiss",
      "fr": "Blanc",
      "tr": "Beyaz"
    }
  },
  "natural": {
    "swatch": "#d9b48a",
    "label": {
      "en": "Natural",
      "de": "Natur",
      "fr": "Naturel",
      "tr": "Doğal"
    }
  },
  "brown": {
    "swatch": "#9a6a43",
    "label": {
      "en": "Brown",
      "de": "Braun",
      "fr": "Brun",
      "tr": "Kahverengi"
    }
  },
  "darkbrown": {
    "swatch": "#4e3424",
    "label": {
      "en": "Dark brown",
      "de": "Dunkelbraun",
      "fr": "Brun foncé",
      "tr": "Koyu kahve"
    }
  },
  "green": {
    "swatch": "#2f6b4a",
    "label": {
      "en": "Green",
      "de": "Grün",
      "fr": "Vert",
      "tr": "Yeşil"
    }
  },
  "oak": {
    "swatch": "#c9a27a",
    "label": {
      "en": "Oak",
      "de": "Eiche",
      "fr": "Chêne",
      "tr": "Meşe"
    }
  },
  "marbleblack": {
    "swatch": "#2a2a2c",
    "label": {
      "en": "Black marble-look",
      "de": "Marmoroptik schwarz",
      "fr": "Aspect marbre noir",
      "tr": "Siyah mermer görünüm"
    }
  },
  "marblewhite": {
    "swatch": "#e8e6e2",
    "label": {
      "en": "White marble-look",
      "de": "Marmoroptik weiss",
      "fr": "Aspect marbre blanc",
      "tr": "Beyaz mermer görünüm"
    }
  },
  "lightbrown": {
    "swatch": "#b98c62",
    "label": {
      "en": "Light brown",
      "de": "Hellbraun",
      "fr": "Brun clair",
      "tr": "Açık kahve"
    }
  },
  "champagne": {
    "swatch": "#c8b48f",
    "label": {
      "en": "Champagne",
      "de": "Champagner",
      "fr": "Champagne",
      "tr": "Şampanya"
    }
  },
  "burgundy": {
    "swatch": "#6d2a2e",
    "label": {
      "en": "Burgundy",
      "de": "Bordeaux",
      "fr": "Bordeaux",
      "tr": "Bordo"
    }
  },
  "walnutblack": {
    "swatch": "#3b2a20",
    "label": {
      "en": "Walnut and black",
      "de": "Nussbaum und Schwarz",
      "fr": "Noyer et noir",
      "tr": "Ceviz ve siyah"
    }
  }
};

window.AHC_PRODUCTS = [
  {
    "id": "aletsch",
    "name": "Aletsch",
    "category": "sculptural",
    "featured": true,
    "description": {
      "en": "A two-zone coffee table: a wooden top and a tempered-glass window over a spiral of stacked layers.",
      "de": "Ein Couchtisch mit zwei Zonen: eine Holzplatte und ein Fenster aus Sicherheitsglas über einer Spirale aus gestapelten Schichten.",
      "fr": "Une table basse en deux zones : un plateau en bois et une fenêtre en verre trempé qui révèle une spirale de couches superposées.",
      "tr": "İki bölgeli bir orta sehpa: ahşap tabla ve üst üste dizilmiş katmanlardan oluşan bir spiralin üzerinde temperli cam pencere."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut",
      "black",
      "white"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "135 × 68 × 34 cm",
        "price": 550
      }
    ],
    "images": [
      "img/products/aletsch/1",
      "img/products/aletsch/2",
      "img/products/aletsch/3",
      "img/products/aletsch/4",
      "img/products/aletsch/5",
      "img/products/aletsch/6",
      "img/products/aletsch/7"
    ],
    "etsy": "https://www.etsy.com/listing/4546068375",
    "leadTime": "stock"
  },
  {
    "id": "leman",
    "name": "Léman",
    "category": "sculptural",
    "featured": true,
    "description": {
      "en": "Rings of 30 mm layers, stacked like contour lines, under a tempered-glass top.",
      "de": "Ringe aus 30 mm starken Schichten, gestapelt wie Höhenlinien, unter einer Platte aus Sicherheitsglas.",
      "fr": "Des anneaux de 30 mm, superposés comme des courbes de niveau, sous un plateau en verre trempé.",
      "tr": "Kabartma haritadaki eş yükselti eğrileri gibi dizilmiş 30 mm'lik halkalar, üzerinde temperli cam tabla."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut",
      "black",
      "white"
    ],
    "variants": [
      {
        "label": {
          "en": "S",
          "de": "S",
          "fr": "S",
          "tr": "S"
        },
        "dims": "60 × 50 × 34 cm",
        "price": 365
      },
      {
        "label": {
          "en": "M",
          "de": "M",
          "fr": "M",
          "tr": "M"
        },
        "dims": "80 × 70 × 34 cm",
        "price": 530
      },
      {
        "label": {
          "en": "L",
          "de": "L",
          "fr": "L",
          "tr": "L"
        },
        "dims": "90 × 80 × 34 cm",
        "price": 650
      },
      {
        "label": {
          "en": "XL",
          "de": "XL",
          "fr": "XL",
          "tr": "XL"
        },
        "dims": "110 × 90 × 37 cm",
        "price": 895
      }
    ],
    "images": [
      "img/products/leman/1",
      "img/products/leman/2",
      "img/products/leman/3",
      "img/products/leman/4",
      "img/products/leman/5",
      "img/products/leman/6",
      "img/products/leman/7",
      "img/products/leman/8"
    ],
    "etsy": "https://www.etsy.com/listing/4545778726",
    "leadTime": "stock"
  },
  {
    "id": "sils",
    "name": "Sils",
    "category": "sculptural",
    "featured": false,
    "description": {
      "en": "Léman's form, framed by a black outer ring.",
      "de": "Die Form von Léman, gefasst von einem schwarzen Ring.",
      "fr": "La forme de Léman, cerclée d'un anneau noir qui en dessine le contour.",
      "tr": "Léman'ın formu, dış çizgisini çizen siyah bir halkayla."
    },
    "material": "veneerGlass",
    "colors": [
      "walnutblack"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "110 × 90 × 38 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/sils/1",
      "img/products/sils/2",
      "img/products/sils/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "rhone",
    "name": "Rhône",
    "category": "sculptural",
    "featured": false,
    "description": {
      "en": "A spiral rising from a conical base to a glass top.",
      "de": "Eine Spirale, die vom konischen Fuss bis zur Glasplatte aufsteigt.",
      "fr": "Une spirale qui monte d'un pied conique jusqu'au plateau en verre.",
      "tr": "Konik bir tabandan cam tablaya yükselen bir spiral."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "90 × 80 × 35 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/rhone/1",
      "img/products/rhone/2",
      "img/products/rhone/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "lavaux",
    "name": "Lavaux",
    "category": "sculptural",
    "featured": true,
    "description": {
      "en": "A stepped base, like vineyard terraces, under a glass top.",
      "de": "Ein gestufter Sockel wie die Rebterrassen, darüber eine Glasplatte.",
      "fr": "Un piètement en gradins, comme les terrasses du vignoble, sous un plateau en verre.",
      "tr": "Üzüm bağı terasları gibi basamaklı bir taban, üzerinde cam tabla."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "110 × 55 × 37 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/lavaux/1",
      "img/products/lavaux/2",
      "img/products/lavaux/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "cervin",
    "name": "Cervin",
    "category": "sculptural",
    "featured": true,
    "description": {
      "en": "A soft-cornered triangle on a parametric slatted base.",
      "de": "Ein Dreieck mit weichen Ecken auf einem parametrischen Lamellensockel.",
      "fr": "Un triangle aux angles adoucis, porté par un piètement paramétrique en lamelles.",
      "tr": "Köşeleri yumuşatılmış bir üçgen, parametrik lamel bir taban üzerinde."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut",
      "black",
      "white"
    ],
    "variants": [
      {
        "label": {
          "en": "S",
          "de": "S",
          "fr": "S",
          "tr": "S"
        },
        "dims": "82 × 80 × 34 cm",
        "price": 545
      },
      {
        "label": {
          "en": "M",
          "de": "M",
          "fr": "M",
          "tr": "M"
        },
        "dims": "109 × 105 × 37 cm",
        "price": 865
      },
      {
        "label": {
          "en": "L",
          "de": "L",
          "fr": "L",
          "tr": "L"
        },
        "dims": "125 × 120 × 37 cm",
        "price": 1000
      },
      {
        "label": {
          "en": "XL",
          "de": "XL",
          "fr": "XL",
          "tr": "XL"
        },
        "dims": "147 × 141 × 40 cm",
        "price": 1225
      }
    ],
    "images": [
      "img/products/cervin/1",
      "img/products/cervin/2",
      "img/products/cervin/3",
      "img/products/cervin/4",
      "img/products/cervin/5",
      "img/products/cervin/6"
    ],
    "etsy": "https://www.etsy.com/listing/4545666098",
    "leadTime": "stock"
  },
  {
    "id": "brienz",
    "name": "Brienz",
    "category": "sculptural",
    "featured": false,
    "description": {
      "en": "A long oval whose slatted base shows through the glass.",
      "de": "Ein lang gezogenes Oval, dessen Lamellensockel durch das Glas sichtbar ist.",
      "fr": "Un ovale allongé dont le piètement en lamelles se lit à travers le verre.",
      "tr": "Lamel tabanı camın içinden görünen uzun bir oval."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut",
      "black",
      "white"
    ],
    "variants": [
      {
        "label": {
          "en": "Coffee table",
          "de": "Couchtisch",
          "fr": "Table centrale",
          "tr": "Orta sehpa"
        },
        "dims": "102 × 51 × 33 cm",
        "price": 515
      },
      {
        "label": {
          "en": "Large coffee table",
          "de": "Grosser Couchtisch",
          "fr": "Grande table centrale",
          "tr": "Büyük orta sehpa"
        },
        "dims": "135 × 64 × 33 cm",
        "price": 760
      }
    ],
    "images": [
      "img/products/brienz/1",
      "img/products/brienz/2",
      "img/products/brienz/3",
      "img/products/brienz/4"
    ],
    "etsy": "https://www.etsy.com/listing/4544532476",
    "leadTime": "stock"
  },
  {
    "id": "arosa",
    "name": "Arosa",
    "category": "coffee-nesting",
    "featured": true,
    "description": {
      "en": "A pebble-shaped coffee table with up to three nesting tables, in stained beech.",
      "de": "Ein Couchtisch in Kieselform und bis zu drei Satztische aus gebeizter Buche.",
      "fr": "Une table centrale en forme de galet et jusqu'à trois tables gigognes, en hêtre teinté.",
      "tr": "Çakıl taşı formunda bir orta sehpa ve üç taneye kadar zigon sehpa, boyalı kayından."
    },
    "material": "beechStained",
    "colors": [
      "natural",
      "brown",
      "darkbrown",
      "green"
    ],
    "variants": [
      {
        "label": {
          "en": "Small coffee table",
          "de": "Kleiner Couchtisch",
          "fr": "Petite table centrale",
          "tr": "Küçük orta sehpa"
        },
        "dims": "82 × 60 × 41 cm",
        "price": 175
      },
      {
        "label": {
          "en": "Coffee table",
          "de": "Couchtisch",
          "fr": "Table centrale",
          "tr": "Orta sehpa"
        },
        "dims": "96 × 70 × 41 cm",
        "price": 205
      },
      {
        "label": {
          "en": "Set of 3 nesting tables",
          "de": "3 Satztische",
          "fr": "Lot de 3 gigognes",
          "tr": "3'lü zigon"
        },
        "dims": "45 × 33 × 41 / 55 × 40 × 46 / 65 × 48 × 51 cm",
        "price": 215
      },
      {
        "label": {
          "en": "Coffee table + 2 nesting tables",
          "de": "Couchtisch + 2 Satztische",
          "fr": "Table centrale + 2 gigognes",
          "tr": "Orta sehpa + 2 zigon"
        },
        "dims": "96 × 70 × 41 cm + 2",
        "price": 340
      },
      {
        "label": {
          "en": "Coffee table + 3 nesting tables",
          "de": "Couchtisch + 3 Satztische",
          "fr": "Table centrale + 3 gigognes",
          "tr": "Orta sehpa + 3 zigon"
        },
        "dims": "96 × 70 × 41 cm + 3",
        "price": 420
      }
    ],
    "images": [
      "img/products/arosa/1",
      "img/products/arosa/2",
      "img/products/arosa/3",
      "img/products/arosa/4",
      "img/products/arosa/5",
      "img/products/arosa/6",
      "img/products/arosa/7",
      "img/products/arosa/8",
      "img/products/arosa/9",
      "img/products/arosa/10"
    ],
    "etsy": "https://www.etsy.com/listing/4541104704",
    "leadTime": "stock"
  },
  {
    "id": "thun",
    "name": "Thun",
    "category": "coffee-nesting",
    "featured": false,
    "description": {
      "en": "A slim oval on tapered legs, with two matching side tables.",
      "de": "Ein schlankes Oval auf konischen Beinen, mit zwei passenden Beistelltischen.",
      "fr": "Un ovale effilé sur pieds fuselés, avec deux tables d'appoint assorties.",
      "tr": "Konik ayaklar üzerinde ince bir oval, iki uyumlu yan sehpayla."
    },
    "material": "beechStained",
    "colors": [
      "natural",
      "brown",
      "darkbrown"
    ],
    "variants": [
      {
        "label": {
          "en": "2 side tables",
          "de": "2 Beistelltische",
          "fr": "2 tables d'appoint",
          "tr": "2 yan sehpa"
        },
        "dims": "50 × 32 × 46 cm",
        "price": 175
      },
      {
        "label": {
          "en": "Coffee table",
          "de": "Couchtisch",
          "fr": "Table centrale",
          "tr": "Orta sehpa"
        },
        "dims": "110 × 51 × 41 cm",
        "price": 200
      },
      {
        "label": {
          "en": "Coffee table + 2 side tables",
          "de": "Couchtisch + 2 Beistelltische",
          "fr": "Table centrale + 2 tables d'appoint",
          "tr": "Orta sehpa + 2 yan sehpa"
        },
        "dims": "110 × 51 × 41 cm + 2",
        "price": 345
      }
    ],
    "images": [
      "img/products/thun/1",
      "img/products/thun/2",
      "img/products/thun/3",
      "img/products/thun/4",
      "img/products/thun/5",
      "img/products/thun/6",
      "img/products/thun/7",
      "img/products/thun/8",
      "img/products/thun/9"
    ],
    "etsy": "https://www.etsy.com/listing/4541987313",
    "leadTime": "stock"
  },
  {
    "id": "saas",
    "name": "Saas",
    "category": "coffee-nesting",
    "featured": false,
    "description": {
      "en": "An oval top engraved with concentric lines, alone or with side tables.",
      "de": "Eine ovale Platte mit eingravierten konzentrischen Linien, allein oder mit Beistelltischen.",
      "fr": "Un plateau ovale gravé de lignes concentriques, seul ou avec ses tables d'appoint.",
      "tr": "İç içe çizgiler kazınmış oval bir tabla, tek başına ya da yan sehpalarıyla."
    },
    "material": "beechSolid",
    "colors": [
      "natural",
      "brown",
      "darkbrown",
      "black"
    ],
    "variants": [
      {
        "label": {
          "en": "Small coffee table",
          "de": "Kleiner Couchtisch",
          "fr": "Petite table centrale",
          "tr": "Küçük orta sehpa"
        },
        "dims": "92 × 40 × 41 cm",
        "price": 165
      },
      {
        "label": {
          "en": "Coffee table",
          "de": "Couchtisch",
          "fr": "Table centrale",
          "tr": "Orta sehpa"
        },
        "dims": "115 × 50 × 41 cm",
        "price": 200
      },
      {
        "label": {
          "en": "Coffee table + 2 side tables",
          "de": "Couchtisch + 2 Beistelltische",
          "fr": "Table centrale + 2 tables d'appoint",
          "tr": "Orta sehpa + 2 yan sehpa"
        },
        "dims": "115 × 50 × 41 cm + 2",
        "price": 345
      }
    ],
    "images": [
      "img/products/saas/1",
      "img/products/saas/2",
      "img/products/saas/3",
      "img/products/saas/4",
      "img/products/saas/5"
    ],
    "etsy": "https://www.etsy.com/listing/4538105822",
    "leadTime": "stock"
  },
  {
    "id": "engadin",
    "name": "Engadin",
    "category": "coffee-nesting",
    "featured": false,
    "description": {
      "en": "A round solid-beech table: geometric engraved top, three turned legs.",
      "de": "Ein runder Tisch aus massiver Buche: gravierte geometrische Platte, drei gedrechselte Beine.",
      "fr": "Une table ronde en hêtre massif : plateau gravé d'un motif géométrique, trois pieds tournés.",
      "tr": "Masif kayından yuvarlak bir sehpa: geometrik desen kazınmış tabla, üç torna ayak."
    },
    "material": "beechSolid",
    "colors": [
      "natural",
      "brown",
      "darkbrown",
      "black"
    ],
    "variants": [
      {
        "label": {
          "en": "Ø 60 cm",
          "de": "Ø 60 cm",
          "fr": "Ø 60 cm",
          "tr": "Ø 60 cm"
        },
        "dims": "Ø 60 × 45 cm",
        "price": 220
      },
      {
        "label": {
          "en": "Ø 75 cm",
          "de": "Ø 75 cm",
          "fr": "Ø 75 cm",
          "tr": "Ø 75 cm"
        },
        "dims": "Ø 75 × 45 cm",
        "price": 310
      },
      {
        "label": {
          "en": "Ø 90 cm",
          "de": "Ø 90 cm",
          "fr": "Ø 90 cm",
          "tr": "Ø 90 cm"
        },
        "dims": "Ø 90 × 45 cm",
        "price": 395
      }
    ],
    "images": [
      "img/products/engadin/1",
      "img/products/engadin/2",
      "img/products/engadin/3"
    ],
    "etsy": "https://www.etsy.com/listing/4546166412",
    "leadTime": "stock"
  },
  {
    "id": "gstaad",
    "name": "Gstaad",
    "category": "coffee-nesting",
    "featured": false,
    "description": {
      "en": "Three triangular tops that nest into one another.",
      "de": "Drei dreieckige Platten, die sich ineinanderschieben.",
      "fr": "Trois plateaux triangulaires qui s'emboîtent.",
      "tr": "İç içe geçen üç üçgen tabla."
    },
    "material": "beechPanel",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "100 × 48 × 52",
        "price": null
      }
    ],
    "images": [
      "img/products/gstaad/1",
      "img/products/gstaad/2",
      "img/products/gstaad/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "belp",
    "name": "Belp",
    "category": "side",
    "featured": true,
    "description": {
      "en": "A C-shaped side table that slides under the sofa. Walnut top, or black or white marble-look.",
      "de": "Ein C-Beistelltisch, der unter das Sofa gleitet. Platte in Nussbaum oder schwarzer bzw. weisser Marmoroptik.",
      "fr": "Une table d'appoint en C qui glisse sous le canapé. Plateau noyer, ou aspect marbre noir ou blanc.",
      "tr": "Kanepenin altına kayan C formunda bir yan sehpa. Ceviz tabla, ya da siyah veya beyaz mermer görünümlü."
    },
    "material": "cTable",
    "colors": [
      "walnut",
      "marbleblack",
      "marblewhite"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "Ø 40 × 60,5 cm",
        "price": 165
      }
    ],
    "images": [
      "img/products/belp/1",
      "img/products/belp/2",
      "img/products/belp/3",
      "img/products/belp/4",
      "img/products/belp/5",
      "img/products/belp/6",
      "img/products/belp/7",
      "img/products/belp/8",
      "img/products/belp/9"
    ],
    "etsy": "https://www.etsy.com/listing/4542072916",
    "leadTime": "stock"
  },
  {
    "id": "gurten",
    "name": "Gurten",
    "category": "side",
    "featured": false,
    "description": {
      "en": "A C-table on casters, in oak or walnut, for a laptop or a coffee.",
      "de": "Ein C-Tisch auf Rollen, in Eiche oder Nussbaum, für Laptop oder Kaffee.",
      "fr": "Une table en C sur roulettes, en chêne ou en noyer, pour l'ordinateur ou le café.",
      "tr": "Tekerlekli bir C sehpa, meşe ya da ceviz; dizüstü bilgisayar ya da kahve için."
    },
    "material": "cCaster",
    "colors": [
      "oak",
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "50 × 35 × 60 cm",
        "price": 165
      }
    ],
    "images": [
      "img/products/gurten/1",
      "img/products/gurten/2",
      "img/products/gurten/3",
      "img/products/gurten/4"
    ],
    "etsy": "https://www.etsy.com/listing/4544320360",
    "leadTime": "stock"
  },
  {
    "id": "zermatt",
    "name": "Zermatt",
    "category": "side",
    "featured": false,
    "description": {
      "en": "A light side table: black metal or wood leg, plain top or engraved with a mandala.",
      "de": "Ein leichter Beistelltisch: Fuss aus schwarzem Metall oder Holz, Platte schlicht oder mit Mandala-Gravur.",
      "fr": "Une table d'appoint légère : pied en métal noir ou en bois, plateau uni ou gravé d'un mandala.",
      "tr": "Hafif bir yan sehpa: siyah metal ya da ahşap ayak, düz ya da mandala kazınmış tabla."
    },
    "material": "veneerMetal",
    "colors": [
      "lightbrown",
      "darkbrown",
      "white"
    ],
    "variants": [
      {
        "label": {
          "en": "Metal leg",
          "de": "Metallfuss",
          "fr": "Pied en métal",
          "tr": "Metal ayak"
        },
        "dims": "Ø 40 × 60 cm",
        "price": 110
      },
      {
        "label": {
          "en": "Wood leg",
          "de": "Holzfuss",
          "fr": "Pied en bois",
          "tr": "Ahşap ayak"
        },
        "dims": "Ø 40 × 60 cm",
        "price": 125
      }
    ],
    "images": [
      "img/products/zermatt/1",
      "img/products/zermatt/2",
      "img/products/zermatt/3",
      "img/products/zermatt/4",
      "img/products/zermatt/5",
      "img/products/zermatt/6"
    ],
    "etsy": "https://www.etsy.com/listing/4542879221",
    "leadTime": "stock"
  },
  {
    "id": "pilatus",
    "name": "Pilatus",
    "category": "side",
    "featured": false,
    "description": {
      "en": "A height-adjustable tray on a slotted upright.",
      "de": "Eine höhenverstellbare Ablage an einer gelochten Stütze.",
      "fr": "Une tablette réglable en hauteur, fixée sur un montant ajouré.",
      "tr": "Delikli bir dikmeye takılan, yüksekliği ayarlanabilir bir tabla."
    },
    "material": "beechPanel",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "50 × 40 × 77 cm (adjustable)",
        "price": null
      }
    ],
    "images": [
      "img/products/pilatus/1",
      "img/products/pilatus/2",
      "img/products/pilatus/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "interlaken",
    "name": "Interlaken",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Natural solid oak, slim legs and softened joints.",
      "de": "Massive Eiche natur, schlanke Beine und weiche Verbindungen.",
      "fr": "Chêne massif naturel, pieds fins et assemblages adoucis.",
      "tr": "Doğal masif meşe, ince ayaklar ve yumuşatılmış birleşimler."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "200 × 100 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/interlaken/1",
      "img/products/interlaken/2",
      "img/products/interlaken/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "bern",
    "name": "Bern",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Solid oak stained black, with architectural lines.",
      "de": "Massive Eiche, schwarz gebeizt, mit architektonischen Linien.",
      "fr": "Chêne massif teinté noir, aux lignes architecturales.",
      "tr": "Siyah boyalı masif meşe, mimari çizgiler."
    },
    "material": "oakSolid",
    "colors": [
      "black"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "200 × 100 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/bern/1",
      "img/products/bern/2",
      "img/products/bern/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "grindelwald",
    "name": "Grindelwald",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Solid oak in a walnut tone; the top's veneers meet at the centre.",
      "de": "Massive Eiche in Nussbaumton; die Furniere der Platte treffen sich in der Mitte.",
      "fr": "Chêne massif teinte noyer ; les placages du plateau se rejoignent au centre.",
      "tr": "Ceviz tonunda masif meşe; tablanın kaplamaları merkezde birleşiyor."
    },
    "material": "oakSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "200 × 100 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/grindelwald/1",
      "img/products/grindelwald/2",
      "img/products/grindelwald/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "lugano",
    "name": "Lugano",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Round top, legs opening out from the centre. Natural oak.",
      "de": "Runde Platte, Beine, die sich von der Mitte aus öffnen. Eiche natur.",
      "fr": "Plateau rond et pieds qui s'ouvrent depuis le centre. Chêne naturel.",
      "tr": "Yuvarlak tabla, merkezden açılan ayaklar. Doğal meşe."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "Ø 120 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/lugano/1",
      "img/products/lugano/2",
      "img/products/lugano/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "davos",
    "name": "Davos",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Solid black oak, V-shaped base.",
      "de": "Massive Eiche schwarz, V-Gestell.",
      "fr": "Chêne massif noir, piètement en V.",
      "tr": "Siyah masif meşe, V ayak."
    },
    "material": "oakSolid",
    "colors": [
      "black"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "180 × 90 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/davos/1",
      "img/products/davos/2",
      "img/products/davos/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "montreux",
    "name": "Montreux",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Solid oak in a walnut tone, crossed base.",
      "de": "Massive Eiche in Nussbaumton, Kreuzgestell.",
      "fr": "Chêne massif teinte noyer, piètement en croix.",
      "tr": "Ceviz tonunda masif meşe, çapraz ayak."
    },
    "material": "oakSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "180 × 90 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/montreux/1",
      "img/products/montreux/2",
      "img/products/montreux/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "luzern",
    "name": "Luzern",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Natural oak, X base, herringbone-patterned top.",
      "de": "Eiche natur, X-Gestell, Platte mit Fischgratmuster.",
      "fr": "Chêne naturel, piètement en X, plateau à motif à chevrons.",
      "tr": "Doğal meşe, X ayak, balıksırtı desenli tabla."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "180 × 90 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/luzern/1",
      "img/products/luzern/2",
      "img/products/luzern/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "ascona",
    "name": "Ascona",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Round oak table in a walnut tone, splayed legs.",
      "de": "Runder Tisch aus Eiche in Nussbaumton, ausgestellte Beine.",
      "fr": "Table ronde en chêne teinte noyer, pieds évasés.",
      "tr": "Ceviz tonunda meşeden yuvarlak masa, açılı ayaklar."
    },
    "material": "oakSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "Ø 120 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/ascona/1",
      "img/products/ascona/2",
      "img/products/ascona/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "verbier",
    "name": "Verbier",
    "category": "dining",
    "featured": false,
    "description": {
      "en": "Sturdy legs and a patterned top, in natural oak.",
      "de": "Kräftige Beine und gemusterte Platte, Eiche natur.",
      "fr": "Pieds robustes et plateau à motif, en chêne naturel.",
      "tr": "Güçlü ayaklar ve desenli tabla, doğal meşe."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": "200 × 100 × 75 cm",
        "price": null
      }
    ],
    "images": [
      "img/products/verbier/1",
      "img/products/verbier/2",
      "img/products/verbier/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "arve",
    "name": "Arve",
    "category": "accessories",
    "featured": false,
    "description": {
      "en": "Solid beech coat stand, flat-pack.",
      "de": "Garderobenständer aus massiver Buche, zerlegbar.",
      "fr": "Portemanteau en hêtre massif, démontable.",
      "tr": "Masif kayın portmanto, demonte."
    },
    "material": "beechSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/arve/1",
      "img/products/arve/2",
      "img/products/arve/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "oeschinen",
    "name": "Oeschinen",
    "category": "mirrors",
    "featured": false,
    "description": {
      "en": "Wall mirror with a slim frame, round shape. Four frame colours.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: rund. Vier Rahmenfarben.",
      "fr": "Miroir mural au cadre fin, forme ronde. Quatre couleurs de cadre.",
      "tr": "İnce çerçeveli duvar aynası, yuvarlak form. Dört çerçeve rengi."
    },
    "material": "mirror",
    "colors": [
      "black",
      "white",
      "champagne",
      "burgundy"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/oeschinen/1",
      "img/products/oeschinen/2",
      "img/products/oeschinen/3",
      "img/products/oeschinen/4"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "blausee",
    "name": "Blausee",
    "category": "mirrors",
    "featured": false,
    "description": {
      "en": "Wall mirror with a slim frame, notched circle shape. Four frame colours.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: eingekerbter Kreis. Vier Rahmenfarben.",
      "fr": "Miroir mural au cadre fin, forme cercle échancré. Quatre couleurs de cadre.",
      "tr": "İnce çerçeveli duvar aynası, çentikli daire form. Dört çerçeve rengi."
    },
    "material": "mirror",
    "colors": [
      "black",
      "white",
      "champagne",
      "burgundy"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/blausee/1",
      "img/products/blausee/2",
      "img/products/blausee/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "cauma",
    "name": "Cauma",
    "category": "mirrors",
    "featured": false,
    "description": {
      "en": "Wall mirror with a slim frame, capsule shape. Four frame colours.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: Kapsel. Vier Rahmenfarben.",
      "fr": "Miroir mural au cadre fin, forme capsule. Quatre couleurs de cadre.",
      "tr": "İnce çerçeveli duvar aynası, kapsül form. Dört çerçeve rengi."
    },
    "material": "mirror",
    "colors": [
      "black",
      "white",
      "champagne",
      "burgundy"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/cauma/1",
      "img/products/cauma/2",
      "img/products/cauma/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "silser",
    "name": "Silser",
    "category": "mirrors",
    "featured": false,
    "description": {
      "en": "Wall mirror with a slim frame, cloud, landscape shape. Four frame colours.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: Wolke, quer. Vier Rahmenfarben.",
      "fr": "Miroir mural au cadre fin, forme nuage, à l'horizontale. Quatre couleurs de cadre.",
      "tr": "İnce çerçeveli duvar aynası, bulut, yatay form. Dört çerçeve rengi."
    },
    "material": "mirror",
    "colors": [
      "black",
      "white",
      "champagne",
      "burgundy"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/silser/1",
      "img/products/silser/2",
      "img/products/silser/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "lauerz",
    "name": "Lauerz",
    "category": "mirrors",
    "featured": false,
    "description": {
      "en": "Wall mirror with a slim frame, D-shape shape. Four frame colours.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: D-Form. Vier Rahmenfarben.",
      "fr": "Miroir mural au cadre fin, forme en D. Quatre couleurs de cadre.",
      "tr": "İnce çerçeveli duvar aynası, D formu form. Dört çerçeve rengi."
    },
    "material": "mirror",
    "colors": [
      "black",
      "white",
      "champagne",
      "burgundy"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/lauerz/1",
      "img/products/lauerz/2",
      "img/products/lauerz/3"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "seealp",
    "name": "Seealp",
    "category": "mirrors",
    "featured": false,
    "description": {
      "en": "Wall mirror with a slim frame, organic pebble shape. Four frame colours.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: organischer Kiesel. Vier Rahmenfarben.",
      "fr": "Miroir mural au cadre fin, forme galet organique. Quatre couleurs de cadre.",
      "tr": "İnce çerçeveli duvar aynası, organik çakıl form. Dört çerçeve rengi."
    },
    "material": "mirror",
    "colors": [
      "black",
      "white",
      "champagne",
      "burgundy"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/seealp/1",
      "img/products/seealp/2",
      "img/products/seealp/3",
      "img/products/seealp/4"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  },
  {
    "id": "bachalp",
    "name": "Bachalp",
    "category": "mirrors",
    "featured": false,
    "description": {
      "en": "Wall mirror with a slim frame, tall wave shape. Four frame colours.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: hohe Welle. Vier Rahmenfarben.",
      "fr": "Miroir mural au cadre fin, forme vague verticale. Quatre couleurs de cadre.",
      "tr": "İnce çerçeveli duvar aynası, dikey dalga form. Dört çerçeve rengi."
    },
    "material": "mirror",
    "colors": [
      "black",
      "white",
      "champagne",
      "burgundy"
    ],
    "variants": [
      {
        "label": {
          "en": "One size",
          "de": "Einheitsgrösse",
          "fr": "Taille unique",
          "tr": "Tek ölçü"
        },
        "dims": null,
        "price": null
      }
    ],
    "images": [
      "img/products/bachalp/1",
      "img/products/bachalp/2",
      "img/products/bachalp/3",
      "img/products/bachalp/4"
    ],
    "etsy": null,
    "leadTime": "onRequest"
  }
];
