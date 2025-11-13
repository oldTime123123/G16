export default function SEOSetting(){
	try{
		var link1 = document.createElement("link");
		link1.rel = "icon";
		link1.href =import.meta.env.VITE_SEO_ICO; //icon 图标
		
		var meta1 = document.createElement("meta");
		meta1.name = "application-name"
		meta1.content =import.meta.env.VITE_SEO_TITLE
		
		var meta2 = document.createElement("meta");
		meta2.name = "apple-mobile-web-app-title"
		meta2.content =import.meta.env.VITE_SEO_TITLE
		
		
		var link2 = document.createElement("link");
		link2.rel = "apple-touch-icon-precomposed"
		link2.size = "120x120"
		link2.href =import.meta.env.VITE_SEO_ICO
		
		var meta3 = document.createElement("meta");
		meta3.name = "mobile-web-app-capable"
		meta3.content = "yes"
		
		
		document.getElementsByTagName("head")[0].appendChild(link1);
		document.getElementsByTagName("head")[0].appendChild(meta1);	
		document.getElementsByTagName("head")[0].appendChild(meta2);
		document.getElementsByTagName("head")[0].appendChild(link2);
		document.getElementsByTagName("head")[0].appendChild(meta3);
	}catch(e){
		//TODO handle the exception
	}
		
}