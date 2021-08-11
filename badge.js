app.component('badge', {
  template: /* vue-html*/ `
  <span class="badge new" v-if="product.new">Nuevo</span>
  <span class="badge offer" v-if="product.offert">Oferta</span>
  `,
  props: ['product'],
});
