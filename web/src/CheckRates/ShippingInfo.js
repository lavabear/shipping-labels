import React from 'react'
import { Container, Form, Button, Label, Accordion, Card, Icon, Image } from 'semantic-ui-react';

let Packages = ({packages}) => {
    if(packages.length === 0)
      return (<h1>Add a Package</h1>)
    return <div className="packages">
      { 
        packages.map((p, index) => (
          <Card key={index} className="package">
            <Card.Content>
              <Card.Header>Package #{index + 1}</Card.Header>
              <Card.Description>Weight: {p.weight}</Card.Description>
              <Card.Description>Height: {p.height}</Card.Description>
              <Card.Description>Width: {p.width}</Card.Description>
              <Card.Description>Length: {p.length}</Card.Description>
            </Card.Content>
          </Card>
        )) 
      }
    </div>
  }
  
  let AddressInput = ({name, address, saveAddress, ...rest}) => (
      <Form key={name} {...rest} onChange={saveAddress} className="address-input">
        <Form.Input label='Name' name="name" value={address.name} placeholder="Taylor Smith"/>
        <Form.Input label='Street' name="street" value={address.street} placeholder="123 Main St."/>
        <Form.Input label='Line 2' name="line_2" value={address.line_2} placeholder="#42"/>
        <Form.Input label='Postal Code' name="postalCode" value={address.postalCode} placeholder="81293"/>
        <Form.Input label='City' name="city" value={address.city}  placeholder="Springfield"/>
        <Form.Input label='State' name="state" value={address.state} placeholder="IL"/>
        <Form.Input label='Country' name="country" value={address.country} placeholder="US"/>
      </Form>
    )
    
    let Input = ({value, ...props}) => {
      return value
      ? <Form.Input {...props} value={value}/>
      : <Form.Input {...props}/>    
    }

    let PackageInput = ({name, input, savePackage, ...rest}) => (
        <>
          <Form key={name} {...rest} className="package-input" onChange={savePackage}>
              <Input label='Weight' name="weight" value={input && input.weight} placeholder="5 oz, 3 lb, 2 g, 7 kg, etc."/>
              <Input label='Height' name="height" value={input && input.height} placeholder="5 in, 3 m, 2 ft, 7 mm, 2 yd, etc." />
              <Input label='Width'  name="width" value={input && input.width} placeholder="5 in, 3 m, 2 ft, 7 mm, 2 yd, etc."/>
              <Input label='Length' name="length" value={input && input.length} placeholder="5 in, 3 m, 2 ft, 7 mm, 2 yd, etc."/>
          </Form>
        </>
    )

const ShippingInfo = ({
  addressInfo, newPackage, activeIndex, packages,
  saveFrom, saveTo, savePackage, addPackage, 
  handleClick, checkRates
}) => (
    <div className="check-prices">
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
            <Label><Icon name='dropdown' />From</Label>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <AddressInput name="from" address={addressInfo.from} saveAddress={saveFrom}/>
          </Accordion.Content>
  
          <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
            <Label><Icon name='dropdown' />To</Label>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <AddressInput name="to" address={addressInfo.to} saveAddress={saveTo}/>
          </Accordion.Content>
  
          <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClick}>
            <Label><Icon name='dropdown' />Package</Label>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <PackageInput savePackage={savePackage} input={newPackage} />
            <Button onClick={addPackage}>Add Another Package</Button>
          </Accordion.Content>
          { 
            packages.length > 0 && (
              <>
                <Accordion.Title active={activeIndex === 3} index={3} onClick={handleClick}>
                    <Label><Icon name='dropdown' />Packages</Label>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <Packages packages={packages} />
                </Accordion.Content>
              </>
            )
          }
        </Accordion>
  
         <Button id="price-check-button" onClick={checkRates}>              
           Check Rates
         </Button>
    </div>
)

export default ShippingInfo