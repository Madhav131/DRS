<View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <Text style={{ color: colors.text }}>
                      ₹{item.wholesale_price * item.qty}
                    </Text> */}

                    {/* <TouchableOpacity style={{ marginTop: '3%', backgroundColor: 'orange', width: '38%', alignSelf: 'flex-end', height: 38, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => addToCart(item)} >
                                    <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                        Add to cart</Text>
                                </TouchableOpacity> */}
                    {/* <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    > */}

                    <MaterialCommunityIcons
                      name="close"
                      color={colors.icon}
                      size={26}
                      style={{
                        padding: "50%",
                        position: "absolute",
                        bottom: metrics.HEIGHT * 0.08,
                      }}
                      onPress={() => removeFromCart(index)}
                    />
- 
                    {/* <Text
                        style={{
                          color: colors.text,
                          marginLeft: "3%",
                          marginRight: "3%",
                        }}
                      >
                        {item.qty}
                      </Text> */}
                    {/* </View> */}

                    
                  </View>