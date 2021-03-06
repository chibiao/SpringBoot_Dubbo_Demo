package com.itlike.vo;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PageListRes implements Serializable {
	private int code = 0;
	private String msg;
	private long count;
	private List<?> data = new ArrayList();

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public List<?> getData() {
        return data;
    }

    public void setData(List<?> data) {
        this.data = data;
    }
}
