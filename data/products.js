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
   - description short text in fr / de / en
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
      "fr": "Noyer",
      "de": "Nussbaum",
      "en": "Walnut"
    }
  },
  "black": {
    "swatch": "#1f1f1f",
    "label": {
      "fr": "Noir",
      "de": "Schwarz",
      "en": "Black"
    }
  },
  "white": {
    "swatch": "#f2f0ec",
    "label": {
      "fr": "Blanc",
      "de": "Weiss",
      "en": "White"
    }
  },
  "natural": {
    "swatch": "#d9b48a",
    "label": {
      "fr": "Naturel",
      "de": "Natur",
      "en": "Natural"
    }
  },
  "brown": {
    "swatch": "#9a6a43",
    "label": {
      "fr": "Brun",
      "de": "Braun",
      "en": "Brown"
    }
  },
  "darkbrown": {
    "swatch": "#4e3424",
    "label": {
      "fr": "Brun foncé",
      "de": "Dunkelbraun",
      "en": "Dark brown"
    }
  },
  "green": {
    "swatch": "#2f6b4a",
    "label": {
      "fr": "Vert",
      "de": "Grün",
      "en": "Green"
    }
  },
  "oak": {
    "swatch": "#c9a27a",
    "label": {
      "fr": "Chêne",
      "de": "Eiche",
      "en": "Oak"
    }
  },
  "marbleblack": {
    "swatch": "#2a2a2c",
    "label": {
      "fr": "Aspect marbre noir",
      "de": "Marmoroptik schwarz",
      "en": "Black marble-look"
    }
  },
  "marblewhite": {
    "swatch": "#e8e6e2",
    "label": {
      "fr": "Aspect marbre blanc",
      "de": "Marmoroptik weiss",
      "en": "White marble-look"
    }
  },
  "lightbrown": {
    "swatch": "#b98c62",
    "label": {
      "fr": "Brun clair",
      "de": "Hellbraun",
      "en": "Light brown"
    }
  },
  "champagne": {
    "swatch": "#c8b48f",
    "label": {
      "fr": "Champagne",
      "de": "Champagner",
      "en": "Champagne"
    }
  },
  "burgundy": {
    "swatch": "#6d2a2e",
    "label": {
      "fr": "Bordeaux",
      "de": "Bordeaux",
      "en": "Burgundy"
    }
  },
  "walnutblack": {
    "swatch": "#3b2a20",
    "label": {
      "fr": "Noyer et noir",
      "de": "Nussbaum und Schwarz",
      "en": "Walnut and black"
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
      "fr": "Une table basse en deux zones : un plateau en bois et une fenêtre en verre trempé qui révèle une spirale de couches superposées.",
      "de": "Ein Couchtisch mit zwei Zonen: eine Holzplatte und ein Fenster aus Sicherheitsglas über einer Spirale aus gestapelten Schichten.",
      "en": "A two-zone coffee table: a wooden top and a tempered-glass window over a spiral of stacked layers."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Des anneaux de 30 mm, superposés comme des courbes de niveau, sous un plateau en verre trempé.",
      "de": "Ringe aus 30 mm starken Schichten, gestapelt wie Höhenlinien, unter einer Platte aus Sicherheitsglas.",
      "en": "Rings of 30 mm layers, stacked like contour lines, under a tempered-glass top."
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
          "fr": "S",
          "de": "S",
          "en": "S"
        },
        "dims": "60 × 50 × 34 cm",
        "price": 365
      },
      {
        "label": {
          "fr": "M",
          "de": "M",
          "en": "M"
        },
        "dims": "80 × 70 × 34 cm",
        "price": 530
      },
      {
        "label": {
          "fr": "L",
          "de": "L",
          "en": "L"
        },
        "dims": "90 × 80 × 34 cm",
        "price": 650
      },
      {
        "label": {
          "fr": "XL",
          "de": "XL",
          "en": "XL"
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
      "fr": "La forme de Léman, cerclée d'un anneau noir qui en dessine le contour.",
      "de": "Die Form von Léman, gefasst von einem schwarzen Ring.",
      "en": "Léman's form, framed by a black outer ring."
    },
    "material": "veneerGlass",
    "colors": [
      "walnutblack"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Une spirale qui monte d'un pied conique jusqu'au plateau en verre.",
      "de": "Eine Spirale, die vom konischen Fuss bis zur Glasplatte aufsteigt.",
      "en": "A spiral rising from a conical base to a glass top."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Un piètement en gradins, comme les terrasses du vignoble, sous un plateau en verre.",
      "de": "Ein gestufter Sockel wie die Rebterrassen, darüber eine Glasplatte.",
      "en": "A stepped base, like vineyard terraces, under a glass top."
    },
    "material": "veneerGlass",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Un triangle aux angles adoucis, porté par un piètement paramétrique en lamelles.",
      "de": "Ein Dreieck mit weichen Ecken auf einem parametrischen Lamellensockel.",
      "en": "A soft-cornered triangle on a parametric slatted base."
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
          "fr": "S",
          "de": "S",
          "en": "S"
        },
        "dims": "82 × 80 × 34 cm",
        "price": 545
      },
      {
        "label": {
          "fr": "M",
          "de": "M",
          "en": "M"
        },
        "dims": "109 × 105 × 37 cm",
        "price": 865
      },
      {
        "label": {
          "fr": "L",
          "de": "L",
          "en": "L"
        },
        "dims": "125 × 120 × 37 cm",
        "price": 1000
      },
      {
        "label": {
          "fr": "XL",
          "de": "XL",
          "en": "XL"
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
      "fr": "Un ovale allongé dont le piètement en lamelles se lit à travers le verre.",
      "de": "Ein lang gezogenes Oval, dessen Lamellensockel durch das Glas sichtbar ist.",
      "en": "A long oval whose slatted base shows through the glass."
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
          "fr": "Table centrale",
          "de": "Couchtisch",
          "en": "Coffee table"
        },
        "dims": "102 × 51 × 33 cm",
        "price": 515
      },
      {
        "label": {
          "fr": "Grande table centrale",
          "de": "Grosser Couchtisch",
          "en": "Large coffee table"
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
      "fr": "Une table centrale en forme de galet et jusqu'à trois tables gigognes, en hêtre teinté.",
      "de": "Ein Couchtisch in Kieselform und bis zu drei Satztische aus gebeizter Buche.",
      "en": "A pebble-shaped coffee table with up to three nesting tables, in stained beech."
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
          "fr": "Petite table centrale",
          "de": "Kleiner Couchtisch",
          "en": "Small coffee table"
        },
        "dims": "82 × 60 × 41 cm",
        "price": 175
      },
      {
        "label": {
          "fr": "Table centrale",
          "de": "Couchtisch",
          "en": "Coffee table"
        },
        "dims": "96 × 70 × 41 cm",
        "price": 205
      },
      {
        "label": {
          "fr": "Lot de 3 gigognes",
          "de": "3 Satztische",
          "en": "Set of 3 nesting tables"
        },
        "dims": "45 × 33 × 41 / 55 × 40 × 46 / 65 × 48 × 51 cm",
        "price": 215
      },
      {
        "label": {
          "fr": "Table centrale + 2 gigognes",
          "de": "Couchtisch + 2 Satztische",
          "en": "Coffee table + 2 nesting tables"
        },
        "dims": "96 × 70 × 41 cm + 2",
        "price": 340
      },
      {
        "label": {
          "fr": "Table centrale + 3 gigognes",
          "de": "Couchtisch + 3 Satztische",
          "en": "Coffee table + 3 nesting tables"
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
      "fr": "Un ovale effilé sur pieds fuselés, avec deux tables d'appoint assorties.",
      "de": "Ein schlankes Oval auf konischen Beinen, mit zwei passenden Beistelltischen.",
      "en": "A slim oval on tapered legs, with two matching side tables."
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
          "fr": "2 tables d'appoint",
          "de": "2 Beistelltische",
          "en": "2 side tables"
        },
        "dims": "50 × 32 × 46 cm",
        "price": 175
      },
      {
        "label": {
          "fr": "Table centrale",
          "de": "Couchtisch",
          "en": "Coffee table"
        },
        "dims": "110 × 51 × 41 cm",
        "price": 200
      },
      {
        "label": {
          "fr": "Table centrale + 2 tables d'appoint",
          "de": "Couchtisch + 2 Beistelltische",
          "en": "Coffee table + 2 side tables"
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
      "fr": "Un plateau ovale gravé de lignes concentriques, seul ou avec ses tables d'appoint.",
      "de": "Eine ovale Platte mit eingravierten konzentrischen Linien, allein oder mit Beistelltischen.",
      "en": "An oval top engraved with concentric lines, alone or with side tables."
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
          "fr": "Petite table centrale",
          "de": "Kleiner Couchtisch",
          "en": "Small coffee table"
        },
        "dims": "92 × 40 × 41 cm",
        "price": 165
      },
      {
        "label": {
          "fr": "Table centrale",
          "de": "Couchtisch",
          "en": "Coffee table"
        },
        "dims": "115 × 50 × 41 cm",
        "price": 200
      },
      {
        "label": {
          "fr": "Table centrale + 2 tables d'appoint",
          "de": "Couchtisch + 2 Beistelltische",
          "en": "Coffee table + 2 side tables"
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
      "fr": "Une table ronde en hêtre massif : plateau gravé d'un motif géométrique, trois pieds tournés.",
      "de": "Ein runder Tisch aus massiver Buche: gravierte geometrische Platte, drei gedrechselte Beine.",
      "en": "A round solid-beech table: geometric engraved top, three turned legs."
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
          "fr": "Ø 60 cm",
          "de": "Ø 60 cm",
          "en": "Ø 60 cm"
        },
        "dims": "Ø 60 × 45 cm",
        "price": 220
      },
      {
        "label": {
          "fr": "Ø 75 cm",
          "de": "Ø 75 cm",
          "en": "Ø 75 cm"
        },
        "dims": "Ø 75 × 45 cm",
        "price": 310
      },
      {
        "label": {
          "fr": "Ø 90 cm",
          "de": "Ø 90 cm",
          "en": "Ø 90 cm"
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
      "fr": "Trois plateaux triangulaires qui s'emboîtent.",
      "de": "Drei dreieckige Platten, die sich ineinanderschieben.",
      "en": "Three triangular tops that nest into one another."
    },
    "material": "beechPanel",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Une table d'appoint en C qui glisse sous le canapé. Plateau noyer, ou aspect marbre noir ou blanc.",
      "de": "Ein C-Beistelltisch, der unter das Sofa gleitet. Platte in Nussbaum oder schwarzer bzw. weisser Marmoroptik.",
      "en": "A C-shaped side table that slides under the sofa. Walnut top, or black or white marble-look."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Une table en C sur roulettes, en chêne ou en noyer, pour l'ordinateur ou le café.",
      "de": "Ein C-Tisch auf Rollen, in Eiche oder Nussbaum, für Laptop oder Kaffee.",
      "en": "A C-table on casters, in oak or walnut, for a laptop or a coffee."
    },
    "material": "cCaster",
    "colors": [
      "oak",
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Une table d'appoint légère : pied en métal noir ou en bois, plateau uni ou gravé d'un mandala.",
      "de": "Ein leichter Beistelltisch: Fuss aus schwarzem Metall oder Holz, Platte schlicht oder mit Mandala-Gravur.",
      "en": "A light side table: black metal or wood leg, plain top or engraved with a mandala."
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
          "fr": "Pied en métal",
          "de": "Metallfuss",
          "en": "Metal leg"
        },
        "dims": "Ø 40 × 60 cm",
        "price": 110
      },
      {
        "label": {
          "fr": "Pied en bois",
          "de": "Holzfuss",
          "en": "Wood leg"
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
      "fr": "Une tablette réglable en hauteur, fixée sur un montant ajouré.",
      "de": "Eine höhenverstellbare Ablage an einer gelochten Stütze.",
      "en": "A height-adjustable tray on a slotted upright."
    },
    "material": "beechPanel",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Chêne massif naturel, pieds fins et assemblages adoucis.",
      "de": "Massive Eiche natur, schlanke Beine und weiche Verbindungen.",
      "en": "Natural solid oak, slim legs and softened joints."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Chêne massif teinté noir, aux lignes architecturales.",
      "de": "Massive Eiche, schwarz gebeizt, mit architektonischen Linien.",
      "en": "Solid oak stained black, with architectural lines."
    },
    "material": "oakSolid",
    "colors": [
      "black"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Chêne massif teinte noyer ; les placages du plateau se rejoignent au centre.",
      "de": "Massive Eiche in Nussbaumton; die Furniere der Platte treffen sich in der Mitte.",
      "en": "Solid oak in a walnut tone; the top's veneers meet at the centre."
    },
    "material": "oakSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Plateau rond et pieds qui s'ouvrent depuis le centre. Chêne naturel.",
      "de": "Runde Platte, Beine, die sich von der Mitte aus öffnen. Eiche natur.",
      "en": "Round top, legs opening out from the centre. Natural oak."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Chêne massif noir, piètement en V.",
      "de": "Massive Eiche schwarz, V-Gestell.",
      "en": "Solid black oak, V-shaped base."
    },
    "material": "oakSolid",
    "colors": [
      "black"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Chêne massif teinte noyer, piètement en croix.",
      "de": "Massive Eiche in Nussbaumton, Kreuzgestell.",
      "en": "Solid oak in a walnut tone, crossed base."
    },
    "material": "oakSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Chêne naturel, piètement en X, plateau à motif à chevrons.",
      "de": "Eiche natur, X-Gestell, Platte mit Fischgratmuster.",
      "en": "Natural oak, X base, herringbone-patterned top."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Table ronde en chêne teinte noyer, pieds évasés.",
      "de": "Runder Tisch aus Eiche in Nussbaumton, ausgestellte Beine.",
      "en": "Round oak table in a walnut tone, splayed legs."
    },
    "material": "oakSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Pieds robustes et plateau à motif, en chêne naturel.",
      "de": "Kräftige Beine und gemusterte Platte, Eiche natur.",
      "en": "Sturdy legs and a patterned top, in natural oak."
    },
    "material": "oakSolid",
    "colors": [
      "natural"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Portemanteau en hêtre massif, démontable.",
      "de": "Garderobenständer aus massiver Buche, zerlegbar.",
      "en": "Solid beech coat stand, flat-pack."
    },
    "material": "beechSolid",
    "colors": [
      "walnut"
    ],
    "variants": [
      {
        "label": {
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Miroir mural au cadre fin, forme ronde. Quatre couleurs de cadre.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: rund. Vier Rahmenfarben.",
      "en": "Wall mirror with a slim frame, round shape. Four frame colours."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Miroir mural au cadre fin, forme cercle échancré. Quatre couleurs de cadre.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: eingekerbter Kreis. Vier Rahmenfarben.",
      "en": "Wall mirror with a slim frame, notched circle shape. Four frame colours."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Miroir mural au cadre fin, forme capsule. Quatre couleurs de cadre.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: Kapsel. Vier Rahmenfarben.",
      "en": "Wall mirror with a slim frame, capsule shape. Four frame colours."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Miroir mural au cadre fin, forme nuage, à l'horizontale. Quatre couleurs de cadre.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: Wolke, quer. Vier Rahmenfarben.",
      "en": "Wall mirror with a slim frame, cloud, landscape shape. Four frame colours."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Miroir mural au cadre fin, forme en D. Quatre couleurs de cadre.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: D-Form. Vier Rahmenfarben.",
      "en": "Wall mirror with a slim frame, D-shape shape. Four frame colours."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Miroir mural au cadre fin, forme galet organique. Quatre couleurs de cadre.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: organischer Kiesel. Vier Rahmenfarben.",
      "en": "Wall mirror with a slim frame, organic pebble shape. Four frame colours."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
      "fr": "Miroir mural au cadre fin, forme vague verticale. Quatre couleurs de cadre.",
      "de": "Wandspiegel mit schmalem Rahmen, Form: hohe Welle. Vier Rahmenfarben.",
      "en": "Wall mirror with a slim frame, tall wave shape. Four frame colours."
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
          "fr": "Taille unique",
          "de": "Einheitsgrösse",
          "en": "One size"
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
