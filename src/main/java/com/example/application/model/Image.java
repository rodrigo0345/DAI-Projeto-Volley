package com.example.application.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
//@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue
    private Integer id;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] data;
    public Image() {}
    public Image(byte[] data) { this.data = data; }
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public byte[] getData() { return data; }
    public void setData(byte[] data) { this.data = data; }
}
