import React from 'react'
import {withRouter} from 'react-router-dom'
import {Menu,Button,Icon} from 'semantic-ui-react'

let LocationPicker = ({onSortDown, onSortUp, selectedLocation, onLocationChange}) => {
    return (
      <>
      <Menu widths={7}>
      <Menu.Item active={selectedLocation === "All"} onClick={() => onLocationChange("All")}>All</Menu.Item>
      <Menu.Item active={selectedLocation === "Asia"} onClick={() => onLocationChange("Asia")}>Asia</Menu.Item>
      <Menu.Item active={selectedLocation === "Africa"} onClick={() => onLocationChange("Africa")}>Africa</Menu.Item>
      <Menu.Item active={selectedLocation === "Americas"} onClick={() => onLocationChange("Americas")}>Americas</Menu.Item>
      <Menu.Item active={selectedLocation === "Europe"} onClick={() => onLocationChange("Europe")}>Europe</Menu.Item>
      <Menu.Item active={selectedLocation === "Australia"} onClick={() => onLocationChange("Australia")}>Australia</Menu.Item>
      <Menu.Item>
        <Button onClick={onSortDown}><Icon name='sort ascending'/></Button>
        <Button onClick={onSortUp}><Icon name='sort descending'/></Button>
      </Menu.Item>
    </Menu>
    </>
    )
  }

export default withRouter(LocationPicker)
