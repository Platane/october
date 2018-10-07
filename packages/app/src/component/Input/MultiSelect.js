import React from 'react'
import styled, { css } from 'react-emotion'
import { Tokenizer, injectFilterState } from 'react-simplest-typeahead'
import type { ID } from '~/type'

type Item = {
  id: ID,
  label: string,
}

const renderOption = ({
  option,
  isHighlighted,
  onMouseDown,
  onMouseOver,
}: {
  option: Item,
}) => (
  <div
    key={option.id}
    onMouseDown={onMouseDown}
    onMouseOver={onMouseOver}
    style={{ fontWeight: isHighlighted && 'bold', padding: '16px' }}
  >
    {option.label}
  </div>
)

const renderItem = ({ item, onDelete }: { item: Item }) => (
  <div key={item.id} style={{ padding: '16px' }}>
    {item.label}
  </div>
)

export type Props = {
  value: ID[],
  onChange: (ID[]) => void,
  options: Item[],
}

const MultiSelect_ = ({
  value,
  placeholder,
  onChange,
  options,
  pattern,
  onPatternChange,
  ...props
}: Props) => (
  <Tokenizer
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    renderItem={renderItem}
    renderOption={renderOption}
    options={options}
    pattern={pattern}
    onPatternChange={onPatternChange}
    customClassName={customClassName}
    uniqueValue
  />
)

const customClassName = {
  input: css`
    padding: 16px;
  `,
}

const filterFunction = pattern => ({ label }) => label.includes(pattern)

export const MultiSelect = injectFilterState({ filter: filterFunction })(
  MultiSelect_
)
