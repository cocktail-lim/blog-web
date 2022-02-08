import React, { useState, useEffect, useMemo } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

interface MdReaderProps {
  content: string;
  className?: string;
}

const MdReader: React.FC<MdReaderProps> = (props) => {
  const [articleContent, setContent] = useState('');
  const md = useMemo(
    () =>
      new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        langPrefix: 'language-',
        highlight: function (str, lang) {
          let d = new Date().getTime();
          if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now();
          }
          const codeIndex = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
          });
          // 复制功能主要使用的是 clipboard.js
          let html = `<button class="copy-btn iconfont iconfuzhi" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"></button>`;
          const linesLength = str.split(/\n/).length - 1;
          // 生成行号
          let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
          for (let index = 0; index < linesLength; index++) {
            linesNum = linesNum + '<span></span>';
          }
          linesNum += '</span>';
          if (lang === null) {
            lang = 'java';
          }
          if (lang && hljs.getLanguage(lang)) {
            // highlight.js 高亮代码
            const preCode = hljs.highlight(lang, str, true).value;
            html = html + preCode;
            if (linesLength) {
              html += '<b class="name">' + lang + '</b>';
            }
            // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "<" 代替，不影响复制功能
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              '</textarea>'
            )}</textarea>`;
          }
          return '';
        },
      }),
    [MarkdownIt]
  );
  useEffect(() => {
    const HTMLContent = md.render(props.content);
    setContent(HTMLContent);
  }, [props.content]);
  return (
    <div className={`md-detail ${props.className}`}>
      <article dangerouslySetInnerHTML={{ __html: articleContent }} />
    </div>
  );
};

export default MdReader;
