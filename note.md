cấu trúc folder - file

<!--
  1. tạo 1 layout dùng chung những thành phần dùng chung thì Outlet
  2. tạo 1 routes public và private sau đó export sang core
  3. tạo 1 core renderLayout để gọi ở App.jsx

 -->

trong src

1. - App.jsx
2. - .env
3. - assets
   - css
   - scss
   - img..
4. - Components (các phần chung)
   - Component1
     - Component1.jsx
     - Component1.scss
   - Component2
     - Component2.jsx
     - Component2.scss
5. - pages (các route)
   - Home
     - Home.jsx
     - Slider.jsx
     - BestSeller.jsx
   - About
     - About.jsx
   - Product
     - Product.jsx
     - ProductCategory.jsx
6. - middlewares ( xử lí private route)
   - AuthMiddleware
7. - routes
   - publicRoutes.jsx
   - privateRoutes.jsx
8. - layouts (Outlet các phần route)
   - defaultLayout
     - DefaultLayout.jsx
     - Header.jsx
     - Footer.jsx
     - Sidebar.jsx
   - AuthLayout
     - AuthLayout.jsx
     - AuthLayout.scss
9. - stores
   - store.js
   - slices
     - authSlice.js
   - middlewares
     - userMiddleware.js
     - productMiddleware.js
10. - services
    - productService.js
    - userServices.js
11. - utils
    - urlUtils.js
    - clientUtils
