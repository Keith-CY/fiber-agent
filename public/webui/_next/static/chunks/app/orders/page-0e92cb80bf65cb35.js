(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[778],{3368:(e,t,a)=>{Promise.resolve().then(a.bind(a,1703))},8250:(e,t,a)=>{"use strict";a.d(t,{Hu:()=>r,Lc:()=>s,WH:()=>c,Sj:()=>u,q0:()=>n,MO:()=>m,Bx:()=>h,Sx:()=>f});let r=null!==(d=null===(o=a.g.process)||void 0===o?void 0:o.env.CHAIN_TYPE)&&void 0!==d?d:"testnet";null===(i=a.g.process)||void 0===i||i.env.FNN_ENDPOINT,null===(l=a.g.process)||void 0===l||l.env.CKB_NODE_ENDPOINT;let n="mainnet"===r?"https://explorer.nervos.org":"https://testnet.explorer.nervos.org",s=8;var o,i,l,d,c=function(e){return e.NegotiatingFunding="NEGOTIATING_FUNDING",e.CollaboratingFundingTx="COLLABORATING_FUNDING_TX",e.SigningCommitment="SIGNING_COMMITMENT",e.AwaitingTxSignatures="AWAITING_TX_SIGNATURES",e.AwaitingChannelReady="AWAITING_CHANNEL_READY",e.ChannelReady="CHANNEL_READY",e.ShuttingDown="SHUTTING_DOWN",e.Closed="CLOSED",e}({}),u=function(e){return e.Fibb="Fibb",e.Fibt="Fibt",e.Fibd="Fibd",e}({}),f=function(e){return e.Open="Open",e.Cancelled="Cancelled",e.Expired="Expired",e.Received="Received",e.Paid="Paid",e.BeingCancelled="BeingCancelled",e.Archived="Archived",e}({}),m=function(e){return e.Account="Account",e.Peer="Peer",e.Channel="Channel",e.Merchant="Merchant",e.Invoice="Order",e}({}),h=function(e){return e.New="New",e.Delete="Delete",e.Update="Update",e.Archive="Archive",e.Cancel="Cancel",e}({})},9174:(e,t,a)=>{"use strict";a.d(t,{KJ:()=>s,Nn:()=>n,X:()=>i,Xc:()=>o,ps:()=>l});var r=a(5064);let n=async()=>fetch("".concat(r.C,"/info")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),s=async()=>fetch("".concat(r.C,"/info/admin")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),o=async()=>fetch("".concat(r.C,"/info/finance")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),i=async()=>fetch("".concat(r.C,"/info/udt-info")).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),l=async(e,t)=>fetch("".concat(r.C,"/info/udt-info/").concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({decimal:t})}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e})},7298:(e,t,a)=>{"use strict";a.d(t,{CF:()=>i,Do:()=>n,gS:()=>s,mo:()=>l,rw:()=>d,wP:()=>o});var r=a(5064);let n=async e=>fetch("".concat(r.C,"/invoices?").concat(new URLSearchParams(e))).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),s=async e=>fetch("".concat(r.C,"/invoices/").concat(e)).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),o=async(e,t,a,n,s,o)=>{if(!n&&!s)throw Error("Payment Preimage or order is required");return fetch("".concat(r.C,"/invoices"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({amount:"0x".concat(e.toString(16)),description:t,currency:a,payment_preimage:n,hash_algorithm:"sha256",order:!n&&s?{merchant_id:s.merchantId,quota:s.quota,detail:s.detail}:null,udt_type_script:o})}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return{code:e.code,result:{address:e.result.invoice_address,paymentHash:e.result.invoice.data.payment_hash},message:null}})},i=async e=>fetch("".concat(r.C,"/invoices/").concat(e),{method:"DELETE"}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),l=async e=>fetch("".concat(r.C,"/invoices/").concat(e),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({action:"archive"})}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e}),d=async(e,t)=>fetch("".concat(r.C,"/invoices/").concat(e),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({endpoint:t})}).then(e=>e.json()).then(e=>{if(e.code)throw Error(e.error);return e})},5064:(e,t,a)=>{"use strict";a.d(t,{C:()=>r,a:()=>n});let r="http://localhost:3000/api",n=1e4},1703:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>K});var r=a(3528),n=a(9992),s=a(736),o=a(5316),i=a(1935),l=a(9392),d=a(9290),c=a(9929),u=a(5543),f=a(5907),m=a(9617),h=a(333),p="Tabs",[x,y]=(0,l.A)(p,[d.RG]),v=(0,d.RG)(),[N,b]=x(p),j=o.forwardRef((e,t)=>{let{__scopeTabs:a,value:n,onValueChange:s,defaultValue:o,orientation:i="horizontal",dir:l,activationMode:d="automatic",...c}=e,p=(0,f.jH)(l),[x,y]=(0,m.i)({prop:n,onChange:s,defaultProp:o});return(0,r.jsx)(N,{scope:a,baseId:(0,h.B)(),value:x,onValueChange:y,orientation:i,dir:p,activationMode:d,children:(0,r.jsx)(u.sG.div,{dir:p,"data-orientation":i,...c,ref:t})})});j.displayName=p;var g="TabsList",w=o.forwardRef((e,t)=>{let{__scopeTabs:a,loop:n=!0,...s}=e,o=b(g,a),i=v(a);return(0,r.jsx)(d.bL,{asChild:!0,...i,orientation:o.orientation,dir:o.dir,loop:n,children:(0,r.jsx)(u.sG.div,{role:"tablist","aria-orientation":o.orientation,...s,ref:t})})});w.displayName=g;var _="TabsTrigger",A=o.forwardRef((e,t)=>{let{__scopeTabs:a,value:n,disabled:s=!1,...o}=e,l=b(_,a),c=v(a),f=S(l.baseId,n),m=R(l.baseId,n),h=n===l.value;return(0,r.jsx)(d.q7,{asChild:!0,...c,focusable:!s,active:h,children:(0,r.jsx)(u.sG.button,{type:"button",role:"tab","aria-selected":h,"aria-controls":m,"data-state":h?"active":"inactive","data-disabled":s?"":void 0,disabled:s,id:f,...o,ref:t,onMouseDown:(0,i.m)(e.onMouseDown,e=>{s||0!==e.button||!1!==e.ctrlKey?e.preventDefault():l.onValueChange(n)}),onKeyDown:(0,i.m)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&l.onValueChange(n)}),onFocus:(0,i.m)(e.onFocus,()=>{let e="manual"!==l.activationMode;h||s||!e||l.onValueChange(n)})})})});A.displayName=_;var T="TabsContent",C=o.forwardRef((e,t)=>{let{__scopeTabs:a,value:n,forceMount:s,children:i,...l}=e,d=b(T,a),f=S(d.baseId,n),m=R(d.baseId,n),h=n===d.value,p=o.useRef(h);return o.useEffect(()=>{let e=requestAnimationFrame(()=>p.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,r.jsx)(c.C,{present:s||h,children:a=>{let{present:n}=a;return(0,r.jsx)(u.sG.div,{"data-state":h?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":f,hidden:!n,id:m,tabIndex:0,...l,ref:t,style:{...e.style,animationDuration:p.current?"0s":void 0},children:n&&i})}})});function S(e,t){return"".concat(e,"-trigger-").concat(t)}function R(e,t){return"".concat(e,"-content-").concat(t)}C.displayName=T;var E=a(6856);let I=o.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)(w,{ref:t,className:(0,E.cn)("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",a),...n})});I.displayName=w.displayName;let O=o.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)(A,{ref:t,className:(0,E.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",a),...n})});O.displayName=A.displayName;let D=o.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)(C,{ref:t,className:(0,E.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",a),...n})});D.displayName=C.displayName;var F=a(2457),k=a(8250),P=a(5547),B=a(7298),G=a(5064),M=a(9174),H=a(7369),L=a(2740),q=a(7083),U=a(4187);let J=e=>{let{address:t,paymentHash:a,status:n}=e,{refetch:s}=(0,P.I)({queryKey:["invoices",n],queryFn:()=>(0,B.Do)({status_list:n}),enabled:!1}),o=async()=>{try{await (0,B.mo)(a),(0,U.oR)({description:"Invoice ".concat(a," archived")}),s()}catch(e){e instanceof Error&&(0,U.oR)({description:"Fail to archive invoice"})}};return console.log({status:n}),(0,r.jsxs)(L.rI,{children:[(0,r.jsx)(L.ty,{children:"Share"}),(0,r.jsxs)(L.SQ,{children:[(0,r.jsx)(L.lp,{children:"Share"}),(0,r.jsx)(L.mB,{}),(0,r.jsx)(L._2,{onClick:()=>{window.navigator.clipboard.writeText(t).then(()=>{(0,U.oR)({description:"Copied"})})},children:"Copy Address"}),n===k.Sx.Open?(0,r.jsx)(L._2,{children:(0,r.jsx)(H.default,{target:"_blank",href:"/payment?".concat(new URLSearchParams({payment_hash:a})),children:"Fast Pay"})}):null,n===k.Sx.Paid?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(L.mB,{}),(0,r.jsx)(L._2,{children:(0,r.jsx)(q.$,{variant:"secondary",className:"w-full",onClick:o,children:"Archive"})})]}):null]})]})};var z=a(3004);let V=e=>{let{status:t}=e,{data:a}=(0,P.I)({queryKey:["invoices",t],queryFn:()=>(0,B.Do)({status_list:t}),refetchInterval:G.a,refetchOnWindowFocus:!0}),{data:n}=(0,P.I)({queryKey:["udt-infos"],queryFn:M.X,refetchOnWindowFocus:!0}),s=a?Math.ceil(a.result.page.total/a.result.page.page_size):1;return(0,r.jsxs)(F.XI,{children:[(0,r.jsx)(F.A0,{children:(0,r.jsxs)(F.Hj,{children:[(0,r.jsx)(F.nd,{className:"w-[100px]",children:"Amount"}),(0,r.jsx)(F.nd,{children:"Status"}),(0,r.jsx)(F.nd,{children:"Description"}),(0,r.jsx)(F.nd,{children:"Memo"}),(0,r.jsx)(F.nd,{children:"Time"}),(0,r.jsx)(F.nd,{className:"text-right",children:"Actions"})]})}),(0,r.jsx)(F.BF,{children:null==a?void 0:a.result.list.map(e=>{var t,a,s;let o=e.udt_type_script_hash?null==n?void 0:n.result.find(t=>t.script_hash===e.udt_type_script_hash):{name:"CKB",decimal:k.Lc},i=JSON.stringify({merchant:null===(t=e.order)||void 0===t?void 0:t.merchant_id,quota:null===(a=e.order)||void 0===a?void 0:a.quota,detail:null===(s=e.order)||void 0===s?void 0:s.detail}),l=(null==o?void 0:o.decimal)?+o.decimal:null;return(0,r.jsxs)(F.Hj,{children:[(0,r.jsxs)(F.nA,{className:"font-medium text-nowrap flex gap-1 items-center",children:["".concat((0,E.c)(e.amount,l).toFormat()," ").concat(null==o?void 0:o.name),null===l?(0,r.jsx)(z.Y,{}):null]}),(0,r.jsx)(F.nA,{children:e.status}),(0,r.jsx)(F.nA,{children:e.description}),(0,r.jsx)(F.nA,{className:"max-w-[200px] overflow-ellipsis overflow-hidden text-nowrap",title:i,children:i}),(0,r.jsx)(F.nA,{children:new Date(e.timestamp).toLocaleString()}),(0,r.jsx)(F.nA,{className:"flex items-center gap-2 justify-end",children:(0,r.jsx)(J,{address:e.address,paymentHash:e.payment_hash,status:e.status})})]},e.payment_hash)})}),(0,r.jsx)(F.r6,{children:"Page ".concat(null==a?void 0:a.result.page.page_no," of ").concat(s)})]})};function K(){return(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsxs)("header",{className:"flex h-16 shrink-0 items-center gap-2 border-b px-4",children:[(0,r.jsx)(n.x2,{className:"ml-1"}),(0,r.jsx)(s.Qp,{children:(0,r.jsxs)(s.AB,{children:[(0,r.jsx)(s.J5,{className:"hidden md:block",children:(0,r.jsx)(s.tJ,{children:"Dashboard"})}),(0,r.jsx)(s.tH,{className:"hidden md:block"}),(0,r.jsx)(s.J5,{children:(0,r.jsx)(s.tJ,{children:"Orders"})})]})})]}),(0,r.jsx)("main",{className:"flex flex-col gap-8 items-center p-10",children:(0,r.jsxs)(j,{defaultValue:"open",className:"w-full",children:[(0,r.jsxs)(I,{children:[(0,r.jsx)(O,{value:"open",children:"Open Orders"}),(0,r.jsx)(O,{value:"paid",children:"Paid Orders"})]}),(0,r.jsx)(D,{value:"open",children:(0,r.jsx)(V,{status:k.Sx.Open})}),(0,r.jsx)(D,{value:"paid",children:(0,r.jsx)(V,{status:k.Sx.Paid})})]})})]})}},3004:(e,t,a)=>{"use strict";a.d(t,{Y:()=>s});var r=a(3528),n=a(6741);let s=()=>(0,r.jsx)("span",{title:"raw value",children:(0,r.jsx)(n.A,{size:"10",color:"#FFB11B"})})},736:(e,t,a)=>{"use strict";a.d(t,{AB:()=>d,J5:()=>c,Qp:()=>l,tH:()=>f,tJ:()=>u});var r=a(3528),n=a(5316),s=a(2635),o=a(9070),i=(a(4769),a(6856));let l=n.forwardRef((e,t)=>{let{...a}=e;return(0,r.jsx)("nav",{ref:t,"aria-label":"breadcrumb",...a})});l.displayName="Breadcrumb";let d=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("ol",{ref:t,className:(0,i.cn)("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",a),...n})});d.displayName="BreadcrumbList";let c=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("li",{ref:t,className:(0,i.cn)("inline-flex items-center gap-1.5",a),...n})});c.displayName="BreadcrumbItem",n.forwardRef((e,t)=>{let{asChild:a,className:n,...o}=e,l=a?s.DX:"a";return(0,r.jsx)(l,{ref:t,className:(0,i.cn)("transition-colors hover:text-foreground",n),...o})}).displayName="BreadcrumbLink";let u=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("span",{ref:t,role:"link","aria-disabled":"true","aria-current":"page",className:(0,i.cn)("font-normal text-foreground",a),...n})});u.displayName="BreadcrumbPage";let f=e=>{let{children:t,className:a,...n}=e;return(0,r.jsx)("li",{role:"presentation","aria-hidden":"true",className:(0,i.cn)("[&>svg]:w-3.5 [&>svg]:h-3.5",a),...n,children:null!=t?t:(0,r.jsx)(o.A,{})})};f.displayName="BreadcrumbSeparator"},2740:(e,t,a)=>{"use strict";a.d(t,{I:()=>f,SQ:()=>m,V0:()=>y,_2:()=>h,lp:()=>p,mB:()=>x,rI:()=>c,ty:()=>u});var r=a(3528),n=a(5316),s=a(4682),o=a(9070),i=a(6830),l=a(7698),d=a(6856);let c=s.bL,u=s.l9,f=s.YJ;s.ZL,s.Pb,s.z6,n.forwardRef((e,t)=>{let{className:a,inset:n,children:i,...l}=e;return(0,r.jsxs)(s.ZP,{ref:t,className:(0,d.cn)("flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",n&&"pl-8",a),...l,children:[i,(0,r.jsx)(o.A,{className:"ml-auto"})]})}).displayName=s.ZP.displayName,n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)(s.G5,{ref:t,className:(0,d.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",a),...n})}).displayName=s.G5.displayName;let m=n.forwardRef((e,t)=>{let{className:a,sideOffset:n=4,...o}=e;return(0,r.jsx)(s.ZL,{children:(0,r.jsx)(s.UC,{ref:t,sideOffset:n,className:(0,d.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",a),...o})})});m.displayName=s.UC.displayName;let h=n.forwardRef((e,t)=>{let{className:a,inset:n,...o}=e;return(0,r.jsx)(s.q7,{ref:t,className:(0,d.cn)("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",n&&"pl-8",a),...o})});h.displayName=s.q7.displayName,n.forwardRef((e,t)=>{let{className:a,children:n,checked:o,...l}=e;return(0,r.jsxs)(s.H_,{ref:t,className:(0,d.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),checked:o,...l,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(s.VF,{children:(0,r.jsx)(i.A,{className:"h-4 w-4"})})}),n]})}).displayName=s.H_.displayName,n.forwardRef((e,t)=>{let{className:a,children:n,...o}=e;return(0,r.jsxs)(s.hN,{ref:t,className:(0,d.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),...o,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(s.VF,{children:(0,r.jsx)(l.A,{className:"h-2 w-2 fill-current"})})}),n]})}).displayName=s.hN.displayName;let p=n.forwardRef((e,t)=>{let{className:a,inset:n,...o}=e;return(0,r.jsx)(s.JU,{ref:t,className:(0,d.cn)("px-2 py-1.5 text-sm font-semibold",n&&"pl-8",a),...o})});p.displayName=s.JU.displayName;let x=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)(s.wv,{ref:t,className:(0,d.cn)("-mx-1 my-1 h-px bg-muted",a),...n})});x.displayName=s.wv.displayName;let y=e=>{let{className:t,...a}=e;return(0,r.jsx)("span",{className:(0,d.cn)("ml-auto text-xs tracking-widest opacity-60",t),...a})};y.displayName="DropdownMenuShortcut"},2457:(e,t,a)=>{"use strict";a.d(t,{A0:()=>i,BF:()=>l,Hj:()=>d,XI:()=>o,nA:()=>u,nd:()=>c,r6:()=>f});var r=a(3528),n=a(5316),s=a(6856);let o=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("div",{className:"relative w-full overflow-auto",children:(0,r.jsx)("table",{ref:t,className:(0,s.cn)("w-full caption-bottom text-sm",a),...n})})});o.displayName="Table";let i=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("thead",{ref:t,className:(0,s.cn)("[&_tr]:border-b",a),...n})});i.displayName="TableHeader";let l=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("tbody",{ref:t,className:(0,s.cn)("[&_tr:last-child]:border-0",a),...n})});l.displayName="TableBody",n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("tfoot",{ref:t,className:(0,s.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",a),...n})}).displayName="TableFooter";let d=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("tr",{ref:t,className:(0,s.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",a),...n})});d.displayName="TableRow";let c=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("th",{ref:t,className:(0,s.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...n})});c.displayName="TableHead";let u=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("td",{ref:t,className:(0,s.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...n})});u.displayName="TableCell";let f=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,r.jsx)("caption",{ref:t,className:(0,s.cn)("mt-4 text-sm text-muted-foreground",a),...n})});f.displayName="TableCaption"},4187:(e,t,a)=>{"use strict";a.d(t,{dj:()=>f,oR:()=>u});var r=a(5316);let n=0,s=new Map,o=e=>{if(s.has(e))return;let t=setTimeout(()=>{s.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);s.set(e,t)},i=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:a}=t;return a?o(a):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},l=[],d={toasts:[]};function c(e){d=i(d,e),l.forEach(e=>{e(d)})}function u(e){let{...t}=e,a=(n=(n+1)%Number.MAX_SAFE_INTEGER).toString(),r=()=>c({type:"DISMISS_TOAST",toastId:a});return c({type:"ADD_TOAST",toast:{...t,id:a,open:!0,onOpenChange:e=>{e||r()}}}),{id:a,dismiss:r,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:a}})}}function f(){let[e,t]=r.useState(d);return r.useEffect(()=>(l.push(t),()=>{let e=l.indexOf(t);e>-1&&l.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},6741:(e,t,a)=>{"use strict";a.d(t,{A:()=>r});let r=(0,a(5420).A)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])}},e=>{var t=t=>e(e.s=t);e.O(0,[5,356,928,801,397,992,465,743,358],()=>t(3368)),_N_E=e.O()}]);