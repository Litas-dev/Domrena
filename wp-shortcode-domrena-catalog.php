<?php
function domrena_catalog_render($atts = []) {
  $items = [
    ["title" => "Darbo rūbai", "href" => "https://domrena.lt/product-category/darbo-rubai/", "img" => "https://domrena.lt/wp-content/uploads/2025/05/pexels-pixabay-162540-1080x675.jpg"],
    ["title" => "Pirštinės", "href" => "https://domrena.lt/product-category/pirstines/", "img" => "https://domrena.lt/wp-content/uploads/2024/08/darbo-pirstines-4-300x300.png"],
    ["title" => "Darbo batai", "href" => "https://domrena.lt/product-category/batai/", "img" => "https://domrena.lt/wp-content/uploads/2025/05/Darbo_Batai_Blog_Cover.png"],
    ["title" => "Pakavimo medžiagos", "href" => "https://domrena.lt/product-category/pakavimo-medziagos/", "img" => "https://domrena.lt/wp-content/uploads/2025/04/Skaidri-akrilo-lipni-juosta-300x300.webp"],
    ["title" => "Kita", "href" => "https://domrena.lt/product-category/kita/", "img" => "https://domrena.lt/wp-content/uploads/2025/04/Universalus-dirzas-PROFESSIONAL-tinkantis-ivairioms-kelnems-1-300x300.webp"],
    ["title" => "Išpardavimas", "href" => "https://domrena.lt/product-category/ispardavimas/", "img" => "https://domrena.lt/wp-content/uploads/2025/10/zieminiai-batai-onyx-winter-spinon-300x300.webp"],
  ];
  ob_start();
  ?>
  <style>
    .dr-wrap{width:min(1200px,100% - 32px);margin:0 auto}
    .dr-catalog{display:grid;grid-template-columns:1fr;gap:12px}
    .dr-card{position:relative;display:block;border-radius:14px;overflow:hidden;text-decoration:none;color:#fff;background:#111;box-shadow:0 10px 20px rgba(0,0,0,.15)}
    .dr-card img{width:100%;height:220px;object-fit:cover;display:block}
    .dr-card span{position:absolute;left:12px;bottom:12px;padding:6px 10px;border-radius:8px;background:rgba(0,0,0,.6);font-weight:600;letter-spacing:.02em}
    @media (min-width:480px){.dr-catalog{grid-template-columns:repeat(2,1fr)}}
    @media (min-width:768px){.dr-catalog{grid-template-columns:repeat(3,1fr)}.dr-card img{height:240px}}
  </style>
  <div class="dr-wrap">
    <div class="dr-catalog">
      <?php foreach ($items as $it): ?>
        <a class="dr-card" href="<?php echo esc_url($it["href"]); ?>">
          <img src="<?php echo esc_url($it["img"]); ?>" alt="<?php echo esc_attr($it["title"]); ?>">
          <span><?php echo esc_html($it["title"]); ?></span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
  <?php
  return ob_get_clean();
}
add_shortcode('domrena_catalog', 'domrena_catalog_render');
