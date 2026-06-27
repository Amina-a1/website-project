// Ensure DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. PRODUCT GALLERY INTERACTIVITY (Image Switcher)
    // =========================================================================
    const thumbnails = document.querySelectorAll(".thumbnails-strip .thumb, .thumb-gallery .thumb");
    const mainPreviewImage = document.querySelector(".main-preview-img img, .product-image img");

    if (thumbnails.length > 0 && mainPreviewImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener("click", function() {
                thumbnails.forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                const clickedImgSrc = this.querySelector("img").src;
                mainPreviewImage.src = clickedImgSrc;
            });
        });
    }

    // =========================================================================
    // 2. PRODUCT SPECIFICATION / DESCRIPTION TABS TOGGLE
    // =========================================================================
    const tabButtons = document.querySelectorAll(".tabs-wrapper .tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener("click", function() {
                tabButtons.forEach(btn => btn.classList.remove("active"));
                tabContents.forEach(content => content.style.display = "none");

                this.classList.add("active");
                const targetTabId = this.getAttribute("data-tab");
                const targetContent = document.getElementById(targetTabId);
                if (targetContent) {
                    targetContent.style.display = "block";
                }
            });
        });
    }

    // =========================================================================
    // 6. MOBILE CATEGORY PILLS SWITCHER (`mobileweb7.html`)
    // =========================================================================
    const categoryPills = document.querySelectorAll(".pills-scroll-container .category-pill");
    if (categoryPills.length > 0) {
        categoryPills.forEach(pill => {
            pill.addEventListener("click", function() {
                categoryPills.forEach(p => p.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }

    // =========================================================================
    // 7. DESKTOP FILTER ACCORDION TOGGLE (`webgridview3.html` / `weblistview2.html`)
    // =========================================================================
    const filterHeaders = document.querySelectorAll(".filter-group-header, .filter-title");
    if (filterHeaders.length > 0) {
        filterHeaders.forEach(header => {
            header.style.cursor = "pointer";
            header.addEventListener("click", function() {
                const filterContent = this.nextElementSibling;
                if (filterContent) {
                    if (filterContent.style.display === "none" || filterContent.style.display === "") {
                        filterContent.style.display = "block";
                    } else {
                        filterContent.style.display = "none";
                    }
                }
            });
        });
    }

    // =========================================================================
    // 8. MOBILE SIDEBAR MENU & OVERLAY TOGGLE
    // =========================================================================
    const menuIcon = document.querySelector(".fa-bars, .fas.fa-bars");
    const sidebar = document.querySelector(".sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const closeBtn = document.querySelector(".close-btn");

    if (sidebar && sidebarOverlay) {
        if (menuIcon) {
            menuIcon.style.cursor = "pointer";
            menuIcon.addEventListener("click", () => {
                sidebar.classList.add("active");
                sidebarOverlay.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        }

        const closeSidebarMenu = () => {
            sidebar.classList.remove("active");
            sidebarOverlay.classList.remove("active");
            document.body.style.overflow = "";
        };

        if (closeBtn) closeBtn.addEventListener("click", closeSidebarMenu);
        sidebarOverlay.addEventListener("click", closeSidebarMenu);
    }

    // =========================================================================
    // 9. DYNAMIC CART PRICING CALCULATOR
    // =========================================================================
    const cartItems = document.querySelectorAll(".cart-item, .cart-table tbody tr");
    const subtotalElement = document.querySelector(".price-subtotal, .summary-row .price, .summary-card .row:first-child span:last-child");
    const totalElement = document.querySelector(".price-total, .summary-row.total .price, .btn-checkout strong, .checkout-btn strong");

    function updateCartTotals() {
        let overallTotal = 0;
        cartItems.forEach(item => {
            const qtySelect = item.querySelector("select, input[type='number']");
            const basePriceElement = item.querySelector(".item-price, .price-text, td:nth-child(3)");
            
            if (qtySelect && basePriceElement) {
                const numericPrice = parseFloat(basePriceElement.textContent.replace(/[^0-9.]/g, ""));
                const currentQty = parseInt(qtySelect.value);
                overallTotal += numericPrice * currentQty;
            }
        });

        if (subtotalElement) subtotalElement.textContent = `$${overallTotal.toFixed(2)}`;
        if (totalElement) {
            if (totalElement.tagName === "STRONG") {
                totalElement.textContent = `Checkout ($${overallTotal.toFixed(2)})`;
            } else {
                totalElement.textContent = `$${overallTotal.toFixed(2)}`;
            }
        }
    }

    cartItems.forEach(item => {
        const selector = item.querySelector("select, input[type='number']");
        if (selector) {
            selector.addEventListener("change", updateCartTotals);
        }
    });

    // =========================================================================
    // 10. WISHLIST BADGE COUNTER INCREMENTER
    // =========================================================================
    const heartButtons = document.querySelectorAll(".fa-heart, .btn-save, .wishlist-icon");
    const heartBadge = document.querySelector(".fa-heart .badge, a[href*='orders'] .count-badge");
    let wishlistCount = 0;

    if (heartButtons.length > 0) {
        heartButtons.forEach(btn => {
            btn.style.cursor = "pointer";
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                this.classList.toggle("favorited");
                
                if (this.classList.contains("favorited")) {
                    this.style.color = "#fa3434";
                    wishlistCount++;
                } else {
                    this.style.color = "";
                    wishlistCount--;
                }

                if (heartBadge) {
                    heartBadge.textContent = wishlistCount;
                    heartBadge.style.display = wishlistCount > 0 ? "inline-block" : "none";
                }
            });
        });
    }

}); // Closes DomContentLoaded cleanly