import React from 'react';

import CheckPrices from './CheckPrices'
import ShippingInfo from './ShippingInfo'

export default class AddressForm extends React.Component {
    state = { 
      activeIndex: 0, packages: [], showRates: false, errors: [],
      newPackage: {},
      addressInfo: {
        from: {}, to: {}, packages: [], extras: {}
      },
    }
  
    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
  
      this.setState({ activeIndex: newIndex })
    }
  
    addPackage = () => {
      let {newPackage, packages} = this.state
      packages.push(newPackage)
      this.setState({ newPackage: {}, packages })
    }
  
    savePackage = (event) => {
      let {newPackage} = this.state
      newPackage[event.target.name] = event.target.value
      this.setState({ newPackage })
    }
  
    saveFrom = (event) => {
      let {addressInfo} = this.state
      addressInfo.from[event.target.name] = event.target.value
      this.setState({ addressInfo })
    }
  
    saveTo = (event) => {
      let {addressInfo} = this.state
      addressInfo.to[event.target.name] = event.target.value
      this.setState({ addressInfo })
    }

    checkRates = () => {
      this.setState({showRates: true})
    }

    tryAgain = (addressInfo) => (() => this.setState({showRates: false, addressInfo}))

    render() {
      const { savePackage, saveFrom, saveTo, addPackage, handleClick, checkRates, state } = this
      const { activeIndex, showRates, packages, addressInfo, newPackage, errors } = state

      let props = { 
        addressInfo, activeIndex, newPackage, packages,
        saveFrom, saveTo, savePackage, addPackage, handleClick, checkRates, 
        errors
       }

      return showRates 
      ? (<CheckPrices parcel={newPackage} addressInfo={addressInfo} back={this.tryAgain(addressInfo)}  />) 
      : <ShippingInfo {...props}/>
    }
  }