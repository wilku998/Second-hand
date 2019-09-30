import React, { FunctionComponent } from "react";
import Container from "../components/Abstracts/Container";
import Loader from "../components/Abstracts/Loader";

export interface ILoadingComponent extends FunctionComponent {
  isFetching: boolean;
  shouldRender: boolean;
  notFoundMessage: string;
}

export default (Component: ILoadingComponent) => {
  return ({ isFetching, shouldRender, notFoundMessage, ...rest }) => (
    <Container>
      {isFetching ? (
        <Loader size={6} />
      ) : shouldRender ? (
        <Component {...rest} />
      ) : (
        <span>{notFoundMessage}</span>
      )}
    </Container>
  );
};
