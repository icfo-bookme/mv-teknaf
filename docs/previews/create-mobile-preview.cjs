const { chromium } = require(process.env.TEMP + '/mvteknaf-gallery-check/node_modules/playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3197'], {stdio:'ignore',windowsHide:true});
(async()=>{let browser;try{
 for(let i=0;i<40;i++){try{await fetch('http://localhost:3197/contact');break;}catch{await new Promise(r=>setTimeout(r,250));}}
 browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,reducedMotion:'reduce'});
 await page.goto('http://localhost:3197/',{waitUntil:'networkidle'});
 await page.evaluate(()=>{
 const heading=[...document.querySelectorAll('h4')].find(el=>el.textContent.includes('Ticket Booking'));
 if(!heading)throw Error('Booking section not found');
 const section=heading.parentElement;
 section.outerHTML=`<section class="booking-preview" aria-label="Booking process preview">
 <div class="route-card"><div class="route-label"><span></span>OUR ROUTE<span></span></div><div class="route-line"><div><b class="pin">&#9679;</b><strong>Teknaf</strong></div><span class="route-dots"></span><img src="/mv-logo.png" alt=""/><span class="route-dots"></span><div><b class="pin">&#9679;</b><strong>Saint Martin's<br>Island</strong></div></div><p>Across the Bay of Bengal</p></div>
 <div class="booking-content"><p class="booking-eyebrow">SIMPLE &amp; HASSLE-FREE</p><h2>Book in 3 easy steps</h2><p class="booking-intro">Your island getaway starts right here.</p>
 <div class="step-card"><span class="step-icon"><img src="/icons/icons-choose.png" alt=""/></span><div><span class="step-number">01</span><h3>Choose your journey</h3><p>Select your travel date and seats</p></div></div>
 <div class="step-card"><span class="step-icon"><img src="/icons/icon-call-center.png" alt=""/></span><div><span class="step-number">02</span><h3>Confirm your booking</h3><p>Share your details &amp; complete payment</p></div></div>
 <div class="step-card"><span class="step-icon"><img src="/icons/icon-ticket-receive.png" alt=""/></span><div><span class="step-number">03</span><h3>Get your ticket</h3><p>Receive your ticket and get ready to sail</p></div></div>
 <a class="booking-call" href="tel:+8801841999922">Call for instant booking <span>&#8599;</span></a><p class="booking-help">Our team is here to help you plan your trip.</p></div></section>`;
 const style=document.createElement('style');style.textContent=`
 .booking-preview{background:#fff;color:#081e45;padding:0 16px 26px;position:relative;font-family:inherit}
 .route-card{position:relative;top:-22px;z-index:25;background:#fff;border:1px solid #e2eeef;border-radius:20px;padding:17px 14px 13px;box-shadow:0 14px 30px -16px #102d4d40;margin-bottom:9px}
 .route-label{display:flex;align-items:center;justify-content:center;gap:13px;font-size:10px;font-weight:800;letter-spacing:2.5px;margin-bottom:14px}.route-label span{height:1px;width:36px;background:#a8cccd}
 .route-line{display:flex;align-items:center;justify-content:center;gap:8px}.route-line>div{display:flex;align-items:center;gap:5px}.route-line strong{font-size:14px;line-height:1.25;white-space:nowrap}.pin{color:#00a69b;font-size:18px}.route-line img{width:38px;height:auto;filter:brightness(0)}.route-dots{flex:1;min-width:8px;max-width:22px;border-top:2px dotted #839cae}.route-card>p{text-align:center;color:#637589;font-style:italic;font-size:11px;margin:12px 0 0}
 .booking-content{text-align:center}.booking-eyebrow{font-size:10px;font-weight:800;letter-spacing:2px;color:#009f96;margin:0 0 8px}.booking-content h2{font-size:27px;letter-spacing:-.8px;font-weight:800;line-height:1.2;margin:0}.booking-intro{font-size:12px;color:#778391;margin:9px 0 23px}
 .step-card{display:flex;align-items:center;gap:13px;text-align:left;padding:13px 12px;background:linear-gradient(110deg,#eaf7f5,#f3f9f9);border:1px solid #e6f2f1;border-radius:15px;margin-bottom:11px}.step-icon{width:48px;height:52px;background:#d1efea;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.step-icon img{width:30px;height:30px;object-fit:contain}.step-card>div{position:relative;padding-left:0;min-width:0}.step-number{font-size:10px;font-weight:800;color:#009f96;letter-spacing:1px;display:block;margin-bottom:3px}.step-card h3{font-size:15px;font-weight:750;line-height:1.3;margin:0 0 3px}.step-card p{font-size:11px;line-height:1.5;color:#677583;margin:0}
 .booking-call{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:20px;text-decoration:none;font-size:12px;font-weight:700;border-radius:10px;padding:13px;background:#0e3166;color:white}.booking-call span{font-size:18px}.booking-help{font-size:10px;color:#89939d;margin:9px 0 0}
 `;document.head.appendChild(style);
 });
 // Load offscreen images for the full-page mockup, without changing project components.
 const height=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=750){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(65);}
 await page.waitForTimeout(900);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);
 await page.screenshot({path:'docs/previews/mobile-home-full.png',fullPage:true});
 await page.evaluate(()=>scrollTo(0,0));
 await page.evaluate(()=>{let node=document.querySelector('.booking-preview').nextElementSibling;while(node){node.style.display='none';node=node.nextElementSibling;}document.querySelector('footer').style.display='none';});
 await page.screenshot({path:'docs/previews/mobile-home-top.png',fullPage:true});
 fs.writeFileSync('docs/previews/mobile-home-preview.html',`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>MV Teknaf mobile homepage preview</title><style>body{margin:0;background:#e8edf2;font-family:Arial,sans-serif}header{text-align:center;padding:18px;color:#334155;font-size:13px}img{display:block;width:100%;max-width:390px;height:auto;margin:auto;box-shadow:0 8px 50px #0f172a20}</style></head><body><header>Mobile homepage preview · proposed route card &amp; booking steps</header><img src="mobile-home-full.png" alt="MV Teknaf full mobile homepage with a route card and three vertical booking steps"></body></html>`);
 console.log('Created full mobile homepage preview and top-section image. App source files are unchanged.');
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.kill();}})();
