import{u as i,r as t,y as n,j as e}from"./index-D8O8_SQL.js";const j=()=>{const[c,{isLoading:l,isError:h,isSuccess:r,error:a,data:d}]=i();return t.useEffect(()=>{c()},[]),t.useEffect(()=>{r&&n.success("customer fetch success")},[r]),e.jsx("div",{className:" container mt-5",children:d&&e.jsxs("table",{className:"table table-bordered table-striped table-hover",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"id"}),e.jsx("th",{children:"name"}),e.jsx("th",{children:"email"}),e.jsx("th",{children:"mobile"}),e.jsx("th",{children:"gender"}),e.jsx("th",{children:"address"}),e.jsx("th",{children:"city"}),e.jsx("th",{children:"infoComplete"}),e.jsx("th",{children:"isActive"})]})}),e.jsx("tbody",{children:d.result.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s._id}),e.jsx("td",{children:s.name}),e.jsx("td",{children:s.email}),e.jsx("td",{children:s.mobile}),e.jsx("td",{children:s.gender}),e.jsx("td",{children:s.address}),e.jsx("td",{children:s.city}),e.jsx("td",{children:s.infocomplete.toString()}),e.jsx("td",{children:s.isActive.toString()})]},s._id))})]})})};export{j as default};
