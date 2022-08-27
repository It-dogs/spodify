import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderContent = props => (
  <ContentLoader
    speed={1.5}
    //width={400}
    //height={160}
    viewBox="0 0 400 160"
    backgroundColor="#d9d9d9"
    foregroundColor="#8f8f8f"
    {...props}
  >
    <rect x="3" y="3" rx="3" ry="3" width="100" height="6" />
    <rect x="6" y="190" rx="3" ry="3" width="292" height="6" />
    <rect x="4" y="215" rx="3" ry="3" width="239" height="6" />
    <rect x="4" y="242" rx="3" ry="3" width="274" height="6" />
  </ContentLoader>
)

const LoaderTitle = props => (
  <ContentLoader viewBox="0 0 500 280" /* height={900} width={80} */ {...props}>
    <rect x="3" y="3" rx="10" ry="10" width="100" height="50" />
  </ContentLoader>
)

export {LoaderContent, LoaderTitle}