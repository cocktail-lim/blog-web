import React, { Fragment, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { PageList } from '@/store/actions/home';
import * as MarkdownIt from 'markdown-it';
import { markdownFilter } from './util';

const ArticleList: React.FC = () => {
  const pageList: PageList = useAppSelector((state) => state.pageList);
  const md = useMemo(() => new MarkdownIt(), [MarkdownIt]);

  return (
    <Fragment>
      {pageList.map((pageItem) => (
        <Link to={`${pageItem.id}`} key={pageItem.id}>
          <div className='page-item-container'>
            <Image className='page-cover' preview={false} src={pageItem.articleCover} />
            <div className='page-content'>
              <h3 className='page-title'>{pageItem.articleTitle}</h3>
              <div className='mark-box'>
                {pageItem.isTop ? <span className='sticky-mark'>置顶</span> : null}
                <span className='date-mark'>{pageItem.createTime}</span>
                <span className='category-mark'>{pageItem.categoryName}</span>
                <span className='tag-list'>
                  {pageItem.tagList.map((tagItem) => (
                    <span className='tag-item' key={tagItem.tagId}>
                      {tagItem.tagName}
                    </span>
                  ))}
                </span>
              </div>
              <p className='page-brief'>
                {markdownFilter(md.render(pageItem.articlePreviewContent))}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default ArticleList;
