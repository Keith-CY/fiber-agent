(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[298],{1798:()=>{},4507:()=>{},8392:(e,r,t)=>{Promise.resolve().then(t.bind(t,5440))},8250:(e,r,t)=>{"use strict";t.d(r,{Hu:()=>a,Lc:()=>l,WH:()=>o,Sj:()=>u,q0:()=>n,MO:()=>h,Bx:()=>m,Sx:()=>f});let a=null!==(i=null===(s=t.g.process)||void 0===s?void 0:s.env.CHAIN_TYPE)&&void 0!==i?i:"testnet";null===(d=t.g.process)||void 0===d||d.env.FNN_ENDPOINT,null===(c=t.g.process)||void 0===c||c.env.CKB_NODE_ENDPOINT;let n="mainnet"===a?"https://explorer.nervos.org":"https://testnet.explorer.nervos.org",l=8;var s,d,c,i,o=function(e){return e.NegotiatingFunding="NEGOTIATING_FUNDING",e.CollaboratingFundingTx="COLLABORATING_FUNDING_TX",e.SigningCommitment="SIGNING_COMMITMENT",e.AwaitingTxSignatures="AWAITING_TX_SIGNATURES",e.AwaitingChannelReady="AWAITING_CHANNEL_READY",e.ChannelReady="CHANNEL_READY",e.ShuttingDown="SHUTTING_DOWN",e.Closed="CLOSED",e}({}),u=function(e){return e.Fibb="Fibb",e.Fibt="Fibt",e.Fibd="Fibd",e}({}),f=function(e){return e.Open="Open",e.Cancelled="Cancelled",e.Expired="Expired",e.Received="Received",e.Paid="Paid",e.BeingCancelled="BeingCancelled",e.Archived="Archived",e}({}),h=function(e){return e.Account="Account",e.Peer="Peer",e.Channel="Channel",e.Merchant="Merchant",e.Invoice="Order",e}({}),m=function(e){return e.New="New",e.Delete="Delete",e.Update="Update",e.Archive="Archive",e.Cancel="Cancel",e}({})},5440:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>C});var a=t(3528),n=t(5547),l=t(9821),s=t(9992),d=t(736),c=t(8569),i=t(2920),o=t(9174),u=t(8250),f=t(5613),h=t(4887),m=t(6775),x=t(4187),p=t(7083),j=t(7369),N=t(8122);let v=e=>{let{address:r}=e;if(!r)return(0,a.jsx)("div",{className:"w-full",children:(0,a.jsx)(N.E,{className:"mt-2 h-20 "})});let t=()=>{window.navigator.clipboard.writeText(r).then(()=>(0,x.oR)({description:"Copied"}))};return(0,a.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,a.jsx)("div",{className:"font-semibold text-md",children:"Address"}),(0,a.jsx)("pre",{className:"rounded-md bg-slate-950 p-4 text-wrap break-all",children:(0,a.jsx)("code",{className:"text-white",children:r})}),(0,a.jsxs)("div",{className:"flex justify-end gap-2",children:[(0,a.jsx)(p.$,{disabled:!0,variant:"outline",onClick:t,children:(0,a.jsx)(f.A,{})}),(0,a.jsx)(p.$,{variant:"outline",onClick:t,children:(0,a.jsx)(h.A,{})}),(0,a.jsx)(j.default,{href:"".concat(u.q0,"/address/").concat(r),target:"_blank",rel:"noopener noreferrer",children:(0,a.jsx)(p.$,{variant:"outline",children:(0,a.jsx)(m.A,{})})})]})]})};var b=t(2457),y=t(5064),g=t(3004),w=t(6856);let A=()=>{let{data:e,isLoading:r}=(0,n.I)({queryKey:["info"],queryFn:o.Nn,refetchInterval:y.a,refetchOnWindowFocus:!0});if(r||!e)return Array.from({length:10}).map((e,r)=>(0,a.jsx)(N.E,{className:"w-full h-5 mt-2"},r));let{CKB:t,...l}=e.result.local_balance,s=Object.entries(l).map(e=>{var r,t;let[a,n]=e;return{id:a,name:null===(r=n.udt_info)||void 0===r?void 0:r.name,decimal:(null===(t=n.udt_info)||void 0===t?void 0:t.decimal)?+n.udt_info.decimal:null,balance:n.balance}});return s.unshift({id:"CKB",name:"CKB",decimal:u.Lc,balance:t.balance}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"font-semibold text-md",children:"Local Balance"}),(0,a.jsxs)(b.XI,{children:[(0,a.jsx)(b.A0,{children:(0,a.jsxs)(b.Hj,{children:[(0,a.jsx)(b.nd,{children:"Token"}),(0,a.jsx)(b.nd,{className:"text-right",children:"Balance"})]})}),(0,a.jsx)(b.BF,{children:s.map(e=>(0,a.jsxs)(b.Hj,{children:[(0,a.jsx)(b.nA,{className:"font-medium",children:e.name}),(0,a.jsxs)(b.nA,{className:"flex justify-end gap-1 items-center",children:[(0,w.c)(e.balance,e.decimal).toFormat(),null===e.decimal?(0,a.jsx)(g.Y,{}):null]})]},e.id))})]})]})};var T=t(3790);let _=()=>{let{data:e,isLoading:r}=(0,n.I)({queryKey:["channels"],queryFn:T.$Q,refetchInterval:y.a,refetchOnWindowFocus:!0}),{data:t}=(0,n.I)({queryKey:["info"],queryFn:o.Nn,refetchInterval:y.a,refetchOnWindowFocus:!0});return r||!e?Array.from({length:10}).map((e,r)=>(0,a.jsx)(N.E,{className:"w-full h-5 mt-2"},r)):(0,a.jsxs)(b.XI,{children:[(0,a.jsx)(b.A0,{children:(0,a.jsxs)(b.Hj,{children:[(0,a.jsx)(b.nd,{children:"Channel ID"}),(0,a.jsx)(b.nd,{children:"Percentage"}),(0,a.jsx)(b.nd,{className:"text-right",children:"Local Balance"})]})}),(0,a.jsx)(b.BF,{children:e.result.filter(e=>+e.local_balance).map(e=>{var r,n,l,s,d,c;let i=e.funding_udt_type_script_hash?{name:null!==(s=null===(r=e.udt)||void 0===r?void 0:r.name)&&void 0!==s?s:null,decimal:(null===(n=e.udt)||void 0===n?void 0:n.decimal)?+e.udt.decimal:null}:{name:"CKB",decimal:u.Lc},o=null!==(c=null==t?void 0:null===(l=t.result.local_balance[null!==(d=e.funding_udt_type_script_hash)&&void 0!==d?d:"CKB"])||void 0===l?void 0:l.balance)&&void 0!==c?c:"",f=+o?(100*+e.local_balance/+o).toFixed(2):null,h="".concat((0,w.c)(e.local_balance,i.decimal)," ").concat(i.name);return(0,a.jsxs)(b.Hj,{children:[(0,a.jsx)(b.nA,{className:"font-medium overflow-hidden overflow-ellipsis font-mono",title:e.channel_id,children:e.channel_id}),(0,a.jsx)(b.nA,{children:"".concat(null!=f?f:"-","% of ").concat(i.name)}),(0,a.jsxs)(b.nA,{className:"flex gap-1 justify-end items-center",children:[h,null===i.decimal?(0,a.jsx)(g.Y,{}):null]})]},e.channel_id)})})]})};function C(){var e;let{data:r}=(0,n.I)({queryKey:["admin"],queryFn:o.KJ}),t=null==r?void 0:null===(e=r.result)||void 0===e?void 0:e.script,f=t?(0,l.pu)({codeHash:t.code_hash,hashType:t.hash_type,args:t.args},"mainnet"===u.Hu):null;return(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsxs)("header",{className:"flex h-16 shrink-0 items-center gap-2 border-b px-4",children:[(0,a.jsx)(s.x2,{className:"ml-1"}),(0,a.jsx)(d.Qp,{children:(0,a.jsxs)(d.AB,{children:[(0,a.jsx)(d.J5,{className:"hidden md:block",children:(0,a.jsx)(d.tJ,{children:"Dashboard"})}),(0,a.jsx)(d.tH,{className:"hidden md:block"}),(0,a.jsx)(d.J5,{children:(0,a.jsx)(d.tJ,{children:"Account"})})]})})]}),(0,a.jsx)("main",{className:"flex flex-col gap-8 items-center p-10",children:(0,a.jsxs)("div",{className:"w-full flex flex-col gap-8",children:[(0,a.jsxs)(c.Zp,{children:[(0,a.jsxs)(c.aR,{children:[(0,a.jsx)(c.ZB,{children:"Admin"}),(0,a.jsx)(c.BT,{children:"Admin info"})]}),(0,a.jsxs)(c.Wu,{children:[(0,a.jsx)(v,{address:f}),(0,a.jsx)(i.w,{className:"my-4"}),(0,a.jsx)(A,{})]})]}),(0,a.jsxs)(c.Zp,{children:[(0,a.jsxs)(c.aR,{children:[(0,a.jsx)(c.ZB,{children:"Balance Distribution"}),(0,a.jsx)(c.BT,{children:"Balance distributed in channels"})]}),(0,a.jsx)(c.Wu,{children:(0,a.jsx)(_,{})})]})]})})]})}},3790:(e,r,t)=>{"use strict";t.d(r,{$Q:()=>n,ay:()=>s,w0:()=>l});var a=t(5064);let n=async()=>fetch("".concat(a.C,"/channels")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),l=async(e,r)=>fetch("".concat(a.C,"/channels/").concat(e),{method:"DELETE",body:JSON.stringify({fee_rate:r})}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),s=async(e,r)=>fetch("".concat(a.C,"/channels"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({peer_id:e,funding_amount:"0x".concat(r.toString(16))})}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e})},9174:(e,r,t)=>{"use strict";t.d(r,{KJ:()=>l,Nn:()=>n,X:()=>d,Xc:()=>s,ps:()=>c});var a=t(5064);let n=async()=>fetch("".concat(a.C,"/info")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),l=async()=>fetch("".concat(a.C,"/info/admin")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),s=async()=>fetch("".concat(a.C,"/info/finance")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),d=async()=>fetch("".concat(a.C,"/info/udt-info")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),c=async(e,r)=>fetch("".concat(a.C,"/info/udt-info/").concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({decimal:r})}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e})},5064:(e,r,t)=>{"use strict";t.d(r,{C:()=>a,a:()=>n});let a="http://localhost:3000/api",n=1e4},3004:(e,r,t)=>{"use strict";t.d(r,{Y:()=>l});var a=t(3528),n=t(6741);let l=()=>(0,a.jsx)("span",{title:"raw value",children:(0,a.jsx)(n.A,{size:"10",color:"#FFB11B"})})},736:(e,r,t)=>{"use strict";t.d(r,{AB:()=>i,J5:()=>o,Qp:()=>c,tH:()=>f,tJ:()=>u});var a=t(3528),n=t(5316),l=t(2635),s=t(9070),d=(t(4769),t(6856));let c=n.forwardRef((e,r)=>{let{...t}=e;return(0,a.jsx)("nav",{ref:r,"aria-label":"breadcrumb",...t})});c.displayName="Breadcrumb";let i=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("ol",{ref:r,className:(0,d.cn)("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",t),...n})});i.displayName="BreadcrumbList";let o=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("li",{ref:r,className:(0,d.cn)("inline-flex items-center gap-1.5",t),...n})});o.displayName="BreadcrumbItem",n.forwardRef((e,r)=>{let{asChild:t,className:n,...s}=e,c=t?l.DX:"a";return(0,a.jsx)(c,{ref:r,className:(0,d.cn)("transition-colors hover:text-foreground",n),...s})}).displayName="BreadcrumbLink";let u=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("span",{ref:r,role:"link","aria-disabled":"true","aria-current":"page",className:(0,d.cn)("font-normal text-foreground",t),...n})});u.displayName="BreadcrumbPage";let f=e=>{let{children:r,className:t,...n}=e;return(0,a.jsx)("li",{role:"presentation","aria-hidden":"true",className:(0,d.cn)("[&>svg]:w-3.5 [&>svg]:h-3.5",t),...n,children:null!=r?r:(0,a.jsx)(s.A,{})})};f.displayName="BreadcrumbSeparator"},8569:(e,r,t)=>{"use strict";t.d(r,{BT:()=>i,Wu:()=>o,ZB:()=>c,Zp:()=>s,aR:()=>d});var a=t(3528),n=t(5316),l=t(6856);let s=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("div",{ref:r,className:(0,l.cn)("rounded-xl border bg-card text-card-foreground shadow",t),...n})});s.displayName="Card";let d=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("div",{ref:r,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",t),...n})});d.displayName="CardHeader";let c=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("div",{ref:r,className:(0,l.cn)("font-semibold leading-none tracking-tight",t),...n})});c.displayName="CardTitle";let i=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("div",{ref:r,className:(0,l.cn)("text-sm text-muted-foreground",t),...n})});i.displayName="CardDescription";let o=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("div",{ref:r,className:(0,l.cn)("p-6 pt-0",t),...n})});o.displayName="CardContent",n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("div",{ref:r,className:(0,l.cn)("flex items-center p-6 pt-0",t),...n})}).displayName="CardFooter"},2457:(e,r,t)=>{"use strict";t.d(r,{A0:()=>d,BF:()=>c,Hj:()=>i,XI:()=>s,nA:()=>u,nd:()=>o,r6:()=>f});var a=t(3528),n=t(5316),l=t(6856);let s=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("div",{className:"relative w-full overflow-auto",children:(0,a.jsx)("table",{ref:r,className:(0,l.cn)("w-full caption-bottom text-sm",t),...n})})});s.displayName="Table";let d=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("thead",{ref:r,className:(0,l.cn)("[&_tr]:border-b",t),...n})});d.displayName="TableHeader";let c=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("tbody",{ref:r,className:(0,l.cn)("[&_tr:last-child]:border-0",t),...n})});c.displayName="TableBody",n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("tfoot",{ref:r,className:(0,l.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",t),...n})}).displayName="TableFooter";let i=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("tr",{ref:r,className:(0,l.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",t),...n})});i.displayName="TableRow";let o=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("th",{ref:r,className:(0,l.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",t),...n})});o.displayName="TableHead";let u=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("td",{ref:r,className:(0,l.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",t),...n})});u.displayName="TableCell";let f=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,a.jsx)("caption",{ref:r,className:(0,l.cn)("mt-4 text-sm text-muted-foreground",t),...n})});f.displayName="TableCaption"},4187:(e,r,t)=>{"use strict";t.d(r,{dj:()=>f,oR:()=>u});var a=t(5316);let n=0,l=new Map,s=e=>{if(l.has(e))return;let r=setTimeout(()=>{l.delete(e),o({type:"REMOVE_TOAST",toastId:e})},1e6);l.set(e,r)},d=(e,r)=>{switch(r.type){case"ADD_TOAST":return{...e,toasts:[r.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case"DISMISS_TOAST":{let{toastId:t}=r;return t?s(t):e.toasts.forEach(e=>{s(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===t||void 0===t?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===r.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)}}},c=[],i={toasts:[]};function o(e){i=d(i,e),c.forEach(e=>{e(i)})}function u(e){let{...r}=e,t=(n=(n+1)%Number.MAX_SAFE_INTEGER).toString(),a=()=>o({type:"DISMISS_TOAST",toastId:t});return o({type:"ADD_TOAST",toast:{...r,id:t,open:!0,onOpenChange:e=>{e||a()}}}),{id:t,dismiss:a,update:e=>o({type:"UPDATE_TOAST",toast:{...e,id:t}})}}function f(){let[e,r]=a.useState(i);return a.useEffect(()=>(c.push(r),()=>{let e=c.indexOf(r);e>-1&&c.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>o({type:"DISMISS_TOAST",toastId:e})}}}},e=>{var r=r=>e(e.s=r);e.O(0,[5,356,928,801,701,992,465,743,358],()=>r(8392)),_N_E=e.O()}]);