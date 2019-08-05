package com.itlike.vo;

import java.io.Serializable;

/**
 * 用于接收前端分页发送的页面和查询条数
 * 
 * @author 迟彪
 *
 */
public class PageVo implements Serializable {
	// 页码
	private int page;
	// 要查询的记录条数
	private int limit;
	//查询使用的keyword
	private String keyword;
	
	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	@Override
	public String toString() {
		return "PageVo [page=" + page + ", limit=" + limit + ", keyword="
				+ keyword + "]";
	}
	

}
