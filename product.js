// eslint-disable-next-line no-undef
app.component('product', {
  template: /*vue-html*/ `
  <section class="product">
  <div class="product__thumbnails">
    <div
      v-for="(image,index) in product.images"
      key="image.thumbnail"
      class="thumb"
      :class="{ active: activeImage === index}"
      :style="{backgroundImage: 'url(' + image.thumbnail + ')'}"
      @click="activeImage=index"
    ></div>
  </div>
  <div class="product__image">
    <img
      :src="product.images[activeImage].image"
      :alt="product.name.toUpperCase()"
    />
  </div>
</section>
<section class="description">
  <h4>{{product.name.toUpperCase()}}</h4>
  <badge :product="product"></badge>


  <p class="description__status" v-if="product.stock >= 4">
    Disponible
  </p>
  <p
    class="description__status"
    v-else-if="product.stock==3 | product.stock ==2"
  >
    Quedan pocas unidades
  </p>
  <p class="description__status" v-else-if="product.stock==1">
    Última Unidad
  </p>
  <p class="description__status" v-if="product.stock==0">Agotado</p>
  <p class="description__price">
    $ {{new Intl.NumberFormat("es-CO").format(product.price)}}
  </p>
  <p class="description__content">{{product.content}}</p>
  <div class="discount">
    <span>Código de descuento</span>
    <input
      type="text"
      placeholder="Ingresa tu código"
      @keyUp.enter="applyDiscount($event)"
    />
  </div>
  <button :disabled="product.stock == 0" @click="addToCar() ">
    Agregar al carrito
  </button>
</section>
  `,
  props: ['product'],
  data() {
    return {
      discountCodes: ['feernandooff', 'webDev'],
      activeImage: 0,
    };
  },
  methods: {
    applyDiscount(event) {
      const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
      if (discountCodeIndex >= 0) {
        this.product.price *= 50 / 100;
        this.discountCodes.splice(discountCodeIndex, 1);
      }
    },
    addToCar() {
      const productIndex = this.cart.findIndex(
        (prod) => prod.name === this.product.name
      );
      if (productIndex >= 0) {
        this.cart[productIndex].quantity += 1;
      } else {
        this.cart.push(this.product);
      }
      this.product.stock -= 1;
    },
  },
});
