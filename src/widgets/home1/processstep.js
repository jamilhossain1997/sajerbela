import React from 'react'
import { Row, Col } from 'reactstrap';
import { useQuery } from 'react-query';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const bannerapi = async () => {
  const result = await apiClient.get(`/v1/banners?banner_type=main_banner`)
  return result.data;
}

const processstep = () => {
  const { isLoading, error, data } = useQuery('bannerapi', bannerapi);
  if (isLoading) return (
    <Skeleton count={1} style={{ height: `300px` }} />
  )
  return (
    <div >
      <Row>
        <Col lg={3} sm={6} >
          <div className="d-flex">
            <div className="mr-2">
              <i className="las la-truck ic-2x text-primary" />
            </div>
            <div>
              <h5 className="mb-1">Free Shipping</h5>
              <p className="mb-0">Writing result-oriented</p>
            </div>
          </div>
        </Col>
        <Col lg={3} sm={6} className="mt-3 mt-sm-0">
          <div className="d-flex">
            <div className="mr-2">
              <i className="las la-hand-holding-usd ic-2x text-primary" />
            </div>
            <div>
              <h5 className="mb-1">Money Return</h5>
              <p className="mb-0">Writing result-oriented</p>
            </div>
          </div>
        </Col>
        <Col lg={3} sm={6} className="mt-3 mt-lg-0">
          <div className="d-flex">
            <div className="mr-2">
              <i className="las la-lock ic-2x text-primary" />
            </div>
            <div>
              <h5 className="mb-1">Secure Payment</h5>
              <p className="mb-0">Writing result-oriented</p>
            </div>
          </div>
        </Col>
        <Col lg={3} sm={6} className="mt-3 mt-lg-0">
          <div className="d-flex">
            <div className="mr-2">
              <i className="las la-headset ic-2x text-primary" />
            </div>
            <div>
              <h5 className="mb-1">24/7 Support</h5>
              <p className="mb-0">Writing result-oriented</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>

  );
}

export default processstep