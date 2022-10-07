import styled from "styled-components";
import { darkGreen } from "../colors";

export const Button = styled.button`
  appearance: none;
  background-color: ${darkGreen};
  color: #fff;
  border-radius: 22px;
  display: inline-block;
  padding: 0 60px;
  font-size: 1rem;
  font-weight: 400;
  height: 45px;
  line-height: 45px;
  letter-spacing: 0;
  border: 0;
  position: relative;
  white-space: nowrap;
  cursor: pointer;
  transition: color .35s,background .35s;
`