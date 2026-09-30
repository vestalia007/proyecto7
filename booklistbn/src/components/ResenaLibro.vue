<template>
  <tr>
    <td>{{ libro.titulo }}</td>
    <td>{{ libro.autor }}</td>
    <td>{{ libro.genero }}</td>
    <td>
      <div class="stock">
        <button @click="$emit('aumentar-stock', libro)">+</button>
        <span>{{ libro.cantidad }}</span>
        <button @click="$emit('reducir-stock', libro)">-</button>
      </div>
    </td>

    <td>
      <button class="btn-modificar" @click="$emit('modificar-libro', libro)">
        Modificar
      </button>
      <button class="btn-eliminar" @click="$emit('eliminar-libro')">
        Eliminar
      </button>
      <router-link class="btn-detalle" :to="`/libros/${libro.id}`">
        >Ver Detalle</router-link
      >
    </td>
  </tr>
</template>

<script>
export default {
  props: ["libro"],
};
</script>

<style>
.stock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.stock span {
  min-width: 25px;
  text-align: center;
}

.stock button {
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #f8f9fa;
  cursor: pointer;
  font-size: 1rem;
}

.stock button:hover {
  background-color: #e9ecef;
  transform: scale(1.08);
}

.acciones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.acciones button,
.btn-detalle {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.btn-modificar {
  background-color: #e9ecef;
}

.btn-eliminar {
  background-color: #f8d7da;
}

.btn-detalle {
  background-color: #e2e3e5;
  color: #212529;
}

.acciones button:hover,
.btn-detalle:hover {
  opacity: 0.8;
}

.btn-detalle:hover {
  background-color: #d6d8db;
}
</style>
