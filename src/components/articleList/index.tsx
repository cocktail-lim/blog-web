import React, { Fragment, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image, message } from 'antd';
import {
  PushpinTwoTone,
  CalendarOutlined,
  ContainerOutlined,
  TagOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { updatePageList, updateCurrent } from '@/store/actions/home';
import { PageList } from '@/store/actions/home';
import { pageListRequest, PageListParams } from '@/apis/article';
import { RequestConfig } from '@/utils/commonTypes';
import { RequestError } from '@/utils/request';
import * as MarkdownIt from 'markdown-it';
import dayjs from 'dayjs';
import { markdownFilter, checkVisible } from './util';
import { throttle } from 'lodash';
import './index.scss';

const ArticleList: React.FC = () => {
  const pageList: PageList = useAppSelector((state) => state.pageList);
  const homeCurrent: number = useAppSelector((state) => state.homeCurrent);
  const [isLoading, setLoading] = useState<boolean>(true);
  const md = useMemo(() => new MarkdownIt(), [MarkdownIt]);
  const lastPageRef = useRef<HTMLDivElement>(null);
  const onScroll = useRef(
    throttle(() => {
      const node = lastPageRef.current;
      if (checkVisible(node)) {
        dispatch(updateCurrent());
      }
    }, 200)
  );

  const dispatch = useAppDispatch();
  const getPageList = useCallback(async () => {
    const config: RequestConfig<PageListParams> = {
      api: '/api/article/listArticlePreviewPage',
      method: 'get',
      params: {
        current: homeCurrent,
        size: 2,
      },
    };
    try {
      setLoading(true);
      const response = await pageListRequest(config);
      const { articleList } = response;
      dispatch(updatePageList(articleList));
      if (articleList.length < 1) {
        cancelScroll();
      }
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
    setLoading(false);
  }, [homeCurrent]);

  useEffect(() => {
    getPageList();
  }, [homeCurrent]);

  const cancelScroll = () => {
    window.removeEventListener('scroll', onScroll.current);
  };

  const addScroll = () => {
    window.addEventListener('scroll', onScroll.current);
  };

  useEffect(() => {
    addScroll();
    return () => {
      cancelScroll();
    };
  }, []);

  return (
    <Fragment>
      {pageList.map((pageItem, pageIndex) => (
        <div className='page-item-container' key={pageItem.id}>
          <Image
            className='page-cover'
            preview={false}
            width={'45%'}
            height={'100%'}
            src={`${pageItem.articleCover}?imageMogr2/rquality/20`}
            fallback='data:image/png;base64,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'
          />
          <div className='page-content'>
            {/* 绑定最后一个element添加监听事件 */}
            {pageIndex === pageList.length - 1 ? (
              <h3 className='page-title' ref={lastPageRef}>
                {pageItem.articleTitle}
              </h3>
            ) : (
              <h3 className='page-title'>{pageItem.articleTitle}</h3>
            )}
            <div className='mark-box'>
              {pageItem.isTop ? (
                <span className='mark-item sticky-mark'>
                  <PushpinTwoTone twoToneColor='#ff7242' />
                  置顶
                </span>
              ) : null}
              <span className='mark-item date-mark'>
                <CalendarOutlined />
                {dayjs(pageItem.createTime).format('YYYY-MM-DD')}
              </span>
              <span className='mark-item category-mark'>
                <ContainerOutlined />
                {pageItem.categoryName}
              </span>
              <span className='mark-item tag-list'>
                {pageItem.tagList.map((tagItem) => (
                  <span className='tag-item' key={tagItem.tagId}>
                    <TagOutlined />
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
      ))}
      {isLoading ? (
        <div className='page-list-loading'>
          <LoadingOutlined />
        </div>
      ) : null}
    </Fragment>
  );
};

export default ArticleList;
