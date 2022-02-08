import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleDetailObject, ArticleDetailParams, articleDetailRequest } from '@/apis/article';
import { RequestConfig } from '@/utils/commonTypes';
import { RequestError } from '@/utils/request';
import { message, Affix, Col, Row, Tag } from 'antd';
import { CalendarOutlined, HistoryOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MdReader from '@/components/mdReader';
import dayjs from 'dayjs';
import './index.scss';
import { TagItem } from '@/store/actions/home';

const inititalArticleState: ArticleDetailObject = {
  id: -1,
  articleTitle: '',
  articleContent: '',
  categoryName: '',
  createTime: '',
  updateTime: '',
  tagList: [],
  articleCover: '',
};

const ArticleDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [articleDetail, setArticleDetail] = useState<ArticleDetailObject>(inititalArticleState);
  useEffect(() => {
    if (params.articleId === undefined) {
      navigate('/404');
    } else {
      async function getArticleDetail() {
        const config: RequestConfig<ArticleDetailParams> = {
          api: '/api/article/showArticleContent',
          method: 'get',
          params: {
            articleId: params.articleId as string,
          },
        };
        try {
          const response = await articleDetailRequest(config);
          const { articleContent } = response;
          setArticleDetail(articleContent);
        } catch (e) {
          const err: RequestError = e as RequestError;
          message.error(err.message);
        }
      }
      getArticleDetail();
    }
  }, []);

  return (
    <div className='article-main'>
      <div
        className='article-header'
        style={{
          backgroundImage: `url(${articleDetail.articleCover})`,
        }}>
        <div className='article-header-info'>
          <h1 className='article-title'>{articleDetail.articleTitle}</h1>
          <div className='article-info-top'>
            <span className='article-info-item'>
              <CalendarOutlined />
              发表于{dayjs(articleDetail.createTime).format('YYYY-MM-DD')}
            </span>
            <span className='article-info-item'>
              <HistoryOutlined />
              更新于
              {dayjs(articleDetail.updateTime || articleDetail.createTime).format('YYYY-MM-DD')}
            </span>
            <span className='article-info-item'>
              <UnorderedListOutlined />
              {articleDetail.categoryName}
            </span>
          </div>
        </div>
      </div>
      <div className='article-container'>
        <Row>
          <Col span={16}>
            <div className='article-content'>
              <MdReader className='reader-container' content={articleDetail.articleContent} />
              <div className='article-tag-list'>
                {articleDetail.tagList.map((tagItem: TagItem) => (
                  <Tag key={tagItem.tagId} color={'blue'}>
                    {tagItem.tagName}
                  </Tag>
                ))}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <Affix offsetTop={10}>
              <div className='side-bar'></div>
            </Affix>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ArticleDetail;
