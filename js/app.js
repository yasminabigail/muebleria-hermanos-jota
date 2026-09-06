(() => {
	"use strict";

	const CART_KEY = "hermanos-jota-carrito";
	const currency = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		maximumFractionDigits: 0
	});

	const getCart = () => {
		try {
			const cart = JSON.parse(localStorage.getItem(CART_KEY));
			return Array.isArray(cart) ? cart : [];
		} catch (error) {
			return [];
		}
	};

	const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

	const loadProducts = async () => new Promise((resolve) => {
		setTimeout(() => resolve(Array.isArray(window.productos) ? window.productos : []), 1000);
	});

	const getCartProducts = (products) => getCart()
		.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
		.filter((item) => item.product);

	const renderCart = (products) => {
		const cartItems = document.querySelector("#cart-items");
		const cartTotal = document.querySelector("#cart-total");
		if (!cartItems || !cartTotal) return;

		const items = getCartProducts(products);
		cartItems.replaceChildren();
		items.forEach(({ product, quantity }) => {
			const item = document.createElement("li");
			item.className = "cart-item";
			item.innerHTML = `
				<div>
					<strong>${product.nombre}</strong>
					<span>${currency.format(product.precio)} c/u</span>
				</div>
				<div class="cart-item__controls">
					<button type="button" data-cart-action="decrease" data-product-id="${product.id}" aria-label="Restar ${product.nombre}">-</button>
					<span>${quantity}</span>
					<button type="button" data-cart-action="increase" data-product-id="${product.id}" aria-label="Sumar ${product.nombre}">+</button>
				</div>
			`;
			cartItems.appendChild(item);
		});

		if (!items.length) {
			const emptyMessage = document.createElement("li");
			emptyMessage.className = "cart-empty";
			emptyMessage.textContent = "Tu carrito está vacío.";
			cartItems.appendChild(emptyMessage);
		}

		const total = items.reduce((sum, { product, quantity }) => sum + product.precio * quantity, 0);
		cartTotal.textContent = currency.format(total);
	};

	const updateCart = (products) => {
		renderCart(products);
	};

	const addToCart = (product, products) => {
		const cart = getCart();
		const existingItem = cart.find((item) => item.id === product.id);
		if (existingItem) existingItem.quantity += 1;
		else cart.push({ id: product.id, quantity: 1 });
		saveCart(cart);
		updateCart(products);
		document.querySelector("#cart-sidebar")?.classList.add("cart-sidebar--open");
	};

	const changeQuantity = (productId, amount, products) => {
		const cart = getCart();
		const item = cart.find((cartItem) => cartItem.id === productId);
		if (!item) return;
		item.quantity += amount;
		const updatedCart = cart.filter((cartItem) => cartItem.quantity > 0);
		saveCart(updatedCart);
		updateCart(products);
	};

	const createProductCard = (product, products) => {
		const article = document.createElement("article");
		article.className = "product-card";
		article.innerHTML = `
			<img src="${product.imagen}" alt="${product.nombre}" class="product-card__img">
			<div class="product-card__body">
				<p class="product-card__category">${product.categoria}</p>
				<h3 class="product-card__title">${product.nombre}</h3>
				<p class="product-card__desc">${product.descripcion}</p>
				<div class="product-card__footer">
					<p class="product-card__price">${currency.format(product.precio)}</p>
					<div class="product-card__actions">
						<a href="producto.html?id=${product.id}" class="btn btn--secondary">Ver más</a>
						<button type="button" class="btn btn--primary product-card__add">Agregar</button>
					</div>
				</div>
			</div>
		`;
		article.querySelector(".product-card__add").addEventListener("click", () => addToCart(product, products));
		return article;
	};

	const renderProducts = (products) => {
		const catalogGrid = document.querySelector("#catalog-grid");
		const featuredGrid = document.querySelector(".featured__grid");
		const searchInput = document.querySelector("#search-input");

		const renderGrid = (grid, visibleProducts) => {
			if (grid) grid.replaceChildren(...visibleProducts.map((product) => createProductCard(product, products)));
		};

		if (featuredGrid) renderGrid(featuredGrid, products.slice(0, 3));
		if (catalogGrid) {
			const renderCatalog = (query = "") => {
				const normalizedQuery = query.trim().toLocaleLowerCase("es");
				const filteredProducts = products.filter((product) => `${product.nombre} ${product.categoria}`
					.toLocaleLowerCase("es").includes(normalizedQuery));
				renderGrid(catalogGrid, filteredProducts);
			};
			renderCatalog();
			searchInput?.addEventListener("input", (event) => renderCatalog(event.target.value));
		}
	};

	const renderProductDetail = (products) => {
		const detailImage = document.querySelector("#product-detail-img");
		if (!detailImage || !products.length) return;
		const id = Number(new URLSearchParams(window.location.search).get("id"));
		const product = products.find((item) => item.id === id) || products[0];
		detailImage.src = product.imagen;
		detailImage.alt = product.nombre;
		document.querySelector("#product-detail-title").textContent = product.nombre;
		document.querySelector("#product-detail-price").textContent = currency.format(product.precio);
		document.querySelector("#product-detail-desc").textContent = product.descripcion;
		document.querySelector("#product-detail-add")?.addEventListener("click", () => addToCart(product, products));
		document.title = `${product.nombre} | Hermanos Jota`;
	};

	const setupCart = (products) => {
		const headerInner = document.querySelector(".site-header__inner");
		if (!headerInner) return;
		const cartToggle = document.createElement("button");
		cartToggle.type = "button";
		cartToggle.id = "cart-toggle";
		cartToggle.className = "cart-toggle";
		cartToggle.setAttribute("aria-label", "Abrir carrito");
		cartToggle.textContent = "Carrito";
		headerInner.appendChild(cartToggle);

		const sidebar = document.createElement("aside");
		sidebar.id = "cart-sidebar";
		sidebar.className = "cart-sidebar";
		sidebar.setAttribute("aria-label", "Carrito de compras");
		sidebar.innerHTML = `
			<div class="cart-sidebar__header"><h2>Tu carrito</h2><button type="button" id="cart-close" aria-label="Cerrar carrito">×</button></div>
			<ul id="cart-items" class="cart-items"></ul>
			<div class="cart-sidebar__total"><span>Total</span><strong id="cart-total">$ 0</strong></div>
		`;
		document.body.appendChild(sidebar);
		cartToggle.addEventListener("click", () => sidebar.classList.toggle("cart-sidebar--open"));
		sidebar.querySelector("#cart-close").addEventListener("click", () => sidebar.classList.remove("cart-sidebar--open"));
		sidebar.addEventListener("click", (event) => {
			const button = event.target.closest("[data-cart-action]");
			if (button) changeQuantity(Number(button.dataset.productId), button.dataset.cartAction === "increase" ? 1 : -1, products);
		});
		updateCart(products);
	};

	const setupContactForm = () => {
		const form = document.querySelector(".contact__form");
		if (!form) return;
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			if (!form.checkValidity()) {
				form.reportValidity();
				return;
			}
			const successMessage = document.createElement("p");
			successMessage.className = "contact__success";
			successMessage.setAttribute("role", "status");
			successMessage.textContent = "¡Gracias por escribirnos! Recibimos tu consulta y te responderemos pronto.";
			form.replaceWith(successMessage);
		});
	};

	const setupMobileNavigation = () => {
		const toggle = document.querySelector(".nav-toggle");
		const header = document.querySelector(".site-header");
		if (!toggle || !header) return;
		toggle.addEventListener("click", () => {
			const isOpen = header.classList.toggle("nav-open");
			toggle.setAttribute("aria-expanded", String(isOpen));
		});
	};

	document.addEventListener("DOMContentLoaded", async () => {
		const products = await loadProducts();
		setupCart(products);
		renderProducts(products);
		renderProductDetail(products);
		setupContactForm();
		setupMobileNavigation();
	});
})();
