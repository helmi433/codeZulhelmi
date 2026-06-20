document.addEventListener('DOMContentLoaded', () => {

    // 1. UPDATE MENU NAVIGASI AKTIF
    try {
        let currentPage = window.location.pathname.split("/").pop();
        // Memastikan parameter seperti # atau ? tidak ikut terbaca
        currentPage = currentPage.split("#")[0].split("?")[0];

        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (currentPage === linkHref || (currentPage === "" && linkHref === "index.html")) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error("Kesalahan navigasi: ", error);
    }

    // 2. LOGIKA FORMULIR & AUTO REDIRECT WHATSAPP
    const orderForm = document.getElementById('orderForm');
    const formContainer = document.getElementById('formContainer');
    const waRedirectBox = document.getElementById('waRedirect');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const noHp = document.getElementById('nomorHp').value;
            const email = document.getElementById('email').value;
            const alamat = document.getElementById('alamat').value;

            formContainer.style.display = 'none';
            waRedirectBox.style.display = 'block';

            // Ganti angka di bawah dengan nomor WhatsApp toko
            const nomorAdmin = "6281234567890"; 
            const teksPesan = `Halo Admin SportGear Center, saya ingin melakukan pemesanan.%0A%0A*Data Pembeli:*%0A- Nomor WA: ${noHp}%0A- Email: ${email}%0A- Alamat: ${alamat}%0A%0AMohon panduan untuk pembayaran. Terima kasih.`;
            
            const linkWhatsApp = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;

            setTimeout(() => {
                window.open(linkWhatsApp, '_blank');
                orderForm.reset();
                waRedirectBox.style.display = 'none';
                formContainer.style.display = 'block';
            }, 2500); 
        });
    }
});