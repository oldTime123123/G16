// translate.config.js
import { Lang } from 'language-translate/types';
import { defineConfig } from 'language-translate/utils';

export default defineConfig({
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 7890,
  // },
  fromLang: Lang.en,
  fromPath: './lang/en.js',
  translateRuntimeChunkSize: 1,
  mergeEnabledChunkValuesLength: 4096,
  translateRuntimeMergeEnabled: true,
  incrementalMode: 'fast',
  //for th
  // translateRuntimeMergeEnabled: false,
  // incrementalMode: 'fast',
  translate: [
    {
      label: '将结果翻译到lang文件夹下',
      targetConfig: [
		  {
		    targetLang: Lang.az,
		    outPath: 'lang/az.js',
		  },
        {
          targetLang: Lang.ar,
          outPath: 'lang/ar.js',
        },
        {
          targetLang: Lang.ru,
          outPath: 'lang/ru.js',
        },
        {
          targetLang: Lang.de,
          outPath: 'lang/de.js',
        },
        {
          targetLang: Lang.es,
          outPath: 'lang/es.js',
        },
        {
          targetLang: Lang.fa,
          outPath: 'lang/fa.js',
        },
      
        {
          targetLang: Lang.fr,
          outPath: 'lang/fr.js',
        },
       
       
      ]
    }
  ]
})