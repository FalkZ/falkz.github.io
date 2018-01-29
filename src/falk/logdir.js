if (typeof this.props.dir !== 'undefined') {
  console.dir(this.props.dir)
}
if (typeof this.props.log !== 'undefined') {
  if(Array.isArray(this.props.log){
    this.props.log.map((log) => console.log(log))
  }else{console.log(this.props.log)}
}
