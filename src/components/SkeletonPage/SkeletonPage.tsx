import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as PropTypes from 'prop-types';
import DisplayText from '../DisplayText';
import SkeletonDisplayText from '../SkeletonDisplayText';
import SkeletonBodyText from '../SkeletonBodyText';

import * as styles from './SkeletonPage.scss';

export interface Props {
  children?: React.ReactNode,
  fullWidth?: boolean,
  secondaryActions?: number,
  title?: string,
  breadcrumbs?: boolean,
}

export default class SkeletonPage extends React.PureComponent<Props, never> {
  static contextTypes = {easdk: PropTypes.object};

  render() {
    const {
      children,
      fullWidth,
      secondaryActions,
      title = '',
      breadcrumbs = 0,
    } = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
    );

    const headerClassName = classNames(
      styles.Header,
      secondaryActions && styles['Header-hasSecondaryActions'],
      breadcrumbs && styles['Header-hasBreadcrumbs'],
    );

    const titleMarkup = title !== null
      ? renderTitle(title)
      : null;

    const secondaryActionsMarkup = secondaryActions
      ? renderSecondaryActions(secondaryActions)
      : null;

    const breadcrumbMarkup = breadcrumbs
      ? renderSecondaryActions(1)
      : null;


    const headerMarkup = !this.context.easdk
      ? <div className={headerClassName}>
          {breadcrumbMarkup}
          {titleMarkup}
          {secondaryActionsMarkup}
        </div>
      : null;

    return (
      <div className={className} role="status" aria-label="Page loading">
        {headerMarkup}
        <div className={styles.Content}>
          {children}
        </div>
      </div>
    );
  }
}

function renderSecondaryActions(actionCount: number) {
  const actions = [];
  for (let i = 0; i < actionCount; i++) {
    const width = Math.round(Math.random() * 40 + 60);
    actions.push(<div className={styles.Action} style={{width}} key={i}><SkeletonBodyText lines={1} /></div>);
  }
  return <div className={styles.Actions}>{actions}</div>;
}

function renderTitle(title: string) {
  const titleContent = title === ''
    ? <SkeletonDisplayText size="large" />
    : <DisplayText size="large" element="h1">{title}</DisplayText>;
  return <div className={styles.Title}>{titleContent}</div>;
}
